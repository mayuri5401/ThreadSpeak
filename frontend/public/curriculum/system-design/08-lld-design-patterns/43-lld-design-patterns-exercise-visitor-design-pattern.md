---
id: "lld-design-patterns-exercise-visitor-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Visitor Design Pattern"
slug: "lld-design-patterns-exercise-visitor-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Visitor Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Visitor Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Document Element Visitor

<!-- payload:lldCodingPracticeBlock:START {"id":"69914d05304f4d72fd909a85","title":"Implement Document Element Visitor","difficulty":"easy","expectedOutput":"Word count: 13\n<h1>My Document</h1>\n<p>This is the first paragraph with some text.</p>\n<img src=\"photo.jpg\" alt=\"A photo\" />\n<p>Another paragraph here.</p>"} -->
Build a document model with `Paragraph`, `Heading`, and `Image` elements. Implement two visitors: a `WordCountVisitor` that counts total words across all text-based elements, and an `HtmlExportVisitor` that converts each element to its HTML representation.

**Requirements:**

- Element interface `DocumentElement` with `accept(visitor)`
- `Paragraph` has `text` (string)
- `Heading` has `text` (string) and `level` (int, 1-6)
- `Image` has `url` (string) and `altText` (string)
- `WordCountVisitor` counts words in Paragraph and Heading text (Image contributes 0 words), exposes `getWordCount()`
- `HtmlExportVisitor` outputs: `<p>text</p>`, `<h{level}>text</h{level}>`, `<img src="url" alt="altText" />`

```java
interface DocumentElement {
    void accept(DocumentVisitor visitor);
}

interface DocumentVisitor {
    void visitParagraph(Paragraph paragraph);
    void visitHeading(Heading heading);
    void visitImage(Image image);
}

// Elements
class Paragraph implements DocumentElement {
    private String text;

    public Paragraph(String text) {
        this.text = text;
    }

    public String getText() { return text; }

    @Override
    public void accept(DocumentVisitor visitor) {
        // TODO: Call visitor.visitParagraph(this)
    }
}

class Heading implements DocumentElement {
    private String text;
    private int level;

    public Heading(String text, int level) {
        this.text = text;
        this.level = level;
    }

    public String getText() { return text; }
    public int getLevel() { return level; }

    @Override
    public void accept(DocumentVisitor visitor) {
        // TODO: Call visitor.visitHeading(this)
    }
}

class Image implements DocumentElement {
    private String url;
    private String altText;

    public Image(String url, String altText) {
        this.url = url;
        this.altText = altText;
    }

    public String getUrl() { return url; }
    public String getAltText() { return altText; }

    @Override
    public void accept(DocumentVisitor visitor) {
        // TODO: Call visitor.visitImage(this)
    }
}

// Visitors
class WordCountVisitor implements DocumentVisitor {
    private int wordCount = 0;

    public int getWordCount() { return wordCount; }

    @Override
    public void visitParagraph(Paragraph paragraph) {
        // TODO: Split paragraph text by spaces, add count to wordCount
    }

    @Override
    public void visitHeading(Heading heading) {
        // TODO: Split heading text by spaces, add count to wordCount
    }

    @Override
    public void visitImage(Image image) {
        // TODO: Images contribute 0 words, nothing to do
    }
}

class HtmlExportVisitor implements DocumentVisitor {
    @Override
    public void visitParagraph(Paragraph paragraph) {
        // TODO: Print "<p>text</p>"
    }

    @Override
    public void visitHeading(Heading heading) {
        // TODO: Print "<h{level}>text</h{level}>"
    }

    @Override
    public void visitImage(Image image) {
        // TODO: Print "<img src=\"url\" alt=\"altText\" />"
    }
}

public class Main {
    public static void main(String[] args) {
        // List<DocumentElement> doc = List.of(
        //     new Heading("My Document", 1),
        //     new Paragraph("This is the first paragraph with some text."),
        //     new Image("photo.jpg", "A photo"),
        //     new Paragraph("Another paragraph here.")
        // );

        // WordCountVisitor counter = new WordCountVisitor();
        // for (DocumentElement el : doc) el.accept(counter);
        // System.out.println("Word count: " + counter.getWordCount());

        // HtmlExportVisitor exporter = new HtmlExportVisitor();
        // for (DocumentElement el : doc) el.accept(exporter);
    }
}
```

```python
from abc import ABC, abstractmethod

class DocumentElement(ABC):
    @abstractmethod
    def accept(self, visitor):
        pass

class DocumentVisitor(ABC):
    @abstractmethod
    def visit_paragraph(self, paragraph):
        pass

    @abstractmethod
    def visit_heading(self, heading):
        pass

    @abstractmethod
    def visit_image(self, image):
        pass

# Elements
class Paragraph(DocumentElement):
    def __init__(self, text):
        self.text = text

    def accept(self, visitor):
        # TODO: Call visitor.visit_paragraph(self)
        pass

class Heading(DocumentElement):
    def __init__(self, text, level):
        self.text = text
        self.level = level

    def accept(self, visitor):
        # TODO: Call visitor.visit_heading(self)
        pass

class Image(DocumentElement):
    def __init__(self, url, alt_text):
        self.url = url
        self.alt_text = alt_text

    def accept(self, visitor):
        # TODO: Call visitor.visit_image(self)
        pass

# Visitors
class WordCountVisitor(DocumentVisitor):
    def __init__(self):
        self.word_count = 0

    def get_word_count(self):
        return self.word_count

    def visit_paragraph(self, paragraph):
        # TODO: Split paragraph text by spaces, add count to word_count
        pass

    def visit_heading(self, heading):
        # TODO: Split heading text by spaces, add count to word_count
        pass

    def visit_image(self, image):
        # TODO: Images contribute 0 words, nothing to do
        pass

class HtmlExportVisitor(DocumentVisitor):
    def visit_paragraph(self, paragraph):
        # TODO: Print "<p>text</p>"
        pass

    def visit_heading(self, heading):
        # TODO: Print "<h{level}>text</h{level}>"
        pass

    def visit_image(self, image):
        # TODO: Print "<img src=\"url\" alt=\"altText\" />"
        pass

if __name__ == "__main__":
    # doc = [
    #     Heading("My Document", 1),
    #     Paragraph("This is the first paragraph with some text."),
    #     Image("photo.jpg", "A photo"),
    #     Paragraph("Another paragraph here.")
    # ]

    # counter = WordCountVisitor()
    # for el in doc: el.accept(counter)
    # print(f"Word count: {counter.get_word_count()}")

    # exporter = HtmlExportVisitor()
    # for el in doc: el.accept(exporter)
    pass
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cstdio>

using namespace std;

class DocumentVisitor;

class DocumentElement {
public:
    virtual void accept(DocumentVisitor* visitor) = 0;
    virtual ~DocumentElement() {}
};

class Paragraph;
class Heading;
class Image;

class DocumentVisitor {
public:
    virtual void visitParagraph(Paragraph* p) = 0;
    virtual void visitHeading(Heading* h) = 0;
    virtual void visitImage(Image* img) = 0;
    virtual ~DocumentVisitor() {}
};

// Elements
class Paragraph : public DocumentElement {
    string text;
public:
    Paragraph(const string& text) : text(text) {}

    const string& getText() const {
        return text;
    }

    void accept(DocumentVisitor* visitor) override {
        // TODO: Call visitor->visitParagraph(this)
    }
};

class Heading : public DocumentElement {
    string text;
    int level;
public:
    Heading(const string& text, int level) : text(text), level(level) {}

    const string& getText() const {
        return text;
    }

    int getLevel() const {
        return level;
    }

    void accept(DocumentVisitor* visitor) override {
        // TODO: Call visitor->visitHeading(this)
    }
};

class Image : public DocumentElement {
    string url;
    string altText;
public:
    Image(const string& url, const string& altText) : url(url), altText(altText) {}

    const string& getUrl() const {
        return url;
    }

    const string& getAltText() const {
        return altText;
    }

    void accept(DocumentVisitor* visitor) override {
        // TODO: Call visitor->visitImage(this)
    }
};

// Visitors
class WordCountVisitor : public DocumentVisitor {
    int wordCount = 0;
public:
    int getWordCount() const {
        return wordCount;
    }

    void visitParagraph(Paragraph* p) override {
        // TODO: Split paragraph text by spaces, add count to wordCount
    }

    void visitHeading(Heading* h) override {
        // TODO: Split heading text by spaces, add count to wordCount
    }

    void visitImage(Image* img) override {
        // TODO: Images contribute 0 words, nothing to do
    }
};

class HtmlExportVisitor : public DocumentVisitor {
public:
    void visitParagraph(Paragraph* p) override {
        // TODO: Print "<p>text</p>"
    }

    void visitHeading(Heading* h) override {
        // TODO: Print "<h{level}>text</h{level}>"
    }

    void visitImage(Image* img) override {
        // TODO: Print "<img src=\"url\" alt=\"altText\" />"
    }
};

int main() {
    // vector<DocumentElement*> doc = {
    //     new Heading("My Document", 1),
    //     new Paragraph("This is the first paragraph with some text."),
    //     new Image("photo.jpg", "A photo"),
    //     new Paragraph("Another paragraph here.")
    // };

    // WordCountVisitor counter;
    // for (auto el : doc) el->accept(&counter);
    // printf("Word count: %d\n", counter.getWordCount());

    // HtmlExportVisitor exporter;
    // for (auto el : doc) el->accept(&exporter);

    // for (auto el : doc) delete el;
    return 0;
}
```

```go
package main

import "fmt"

type DocumentElement interface {
	accept(visitor DocumentVisitor)
}

type DocumentVisitor interface {
	visitParagraph(paragraph *Paragraph)
	visitHeading(heading *Heading)
	visitImage(image *Image)
}

// Elements
type Paragraph struct {
	text string
}

func NewParagraph(text string) *Paragraph {
	return &Paragraph{text: text}
}

func (p *Paragraph) getText() string {
	return p.text
}

func (p *Paragraph) accept(visitor DocumentVisitor) {
	// TODO: Call visitor.visitParagraph(this)
}

type Heading struct {
	text  string
	level int
}

func NewHeading(text string, level int) *Heading {
	return &Heading{text: text, level: level}
}

func (h *Heading) getText() string {
	return h.text
}

func (h *Heading) getLevel() int {
	return h.level
}

func (h *Heading) accept(visitor DocumentVisitor) {
	// TODO: Call visitor.visitHeading(this)
}

type Image struct {
	url     string
	altText string
}

func NewImage(url string, altText string) *Image {
	return &Image{url: url, altText: altText}
}

func (i *Image) getUrl() string {
	return i.url
}

func (i *Image) getAltText() string {
	return i.altText
}

func (i *Image) accept(visitor DocumentVisitor) {
	// TODO: Call visitor.visitImage(this)
}

// Visitors
type WordCountVisitor struct {
	wordCount int
}

func NewWordCountVisitor() *WordCountVisitor {
	return &WordCountVisitor{}
}

func (w *WordCountVisitor) getWordCount() int {
	return w.wordCount
}

func (w *WordCountVisitor) visitParagraph(paragraph *Paragraph) {
	// TODO: Split paragraph text by spaces, add count to wordCount
}

func (w *WordCountVisitor) visitHeading(heading *Heading) {
	// TODO: Split heading text by spaces, add count to wordCount
}

func (w *WordCountVisitor) visitImage(image *Image) {
	// TODO: Images contribute 0 words, nothing to do
}

type HtmlExportVisitor struct{}

func NewHtmlExportVisitor() *HtmlExportVisitor {
	return &HtmlExportVisitor{}
}

func (h *HtmlExportVisitor) visitParagraph(paragraph *Paragraph) {
	// TODO: Print "<p>text</p>"
	fmt.Println()
}

func (h *HtmlExportVisitor) visitHeading(heading *Heading) {
	// TODO: Print "<h{level}>text</h{level}>"
	fmt.Println()
}

func (h *HtmlExportVisitor) visitImage(image *Image) {
	// TODO: Print "<img src=\"url\" alt=\"altText\" />"
	fmt.Println()
}

func main() {
	// doc := []DocumentElement{
	// 	NewHeading("My Document", 1),
	// 	NewParagraph("This is the first paragraph with some text."),
	// 	NewImage("photo.jpg", "A photo"),
	// 	NewParagraph("Another paragraph here."),
	// }

	// counter := NewWordCountVisitor()
	// for _, el := range doc {
	// 	el.accept(counter)
	// }
	// fmt.Printf("Word count: %d\n", counter.getWordCount())

	// exporter := NewHtmlExportVisitor()
	// for _, el := range doc {
	// 	el.accept(exporter)
	// }
}
```

```csharp
using System;
using System.Collections.Generic;

interface IDocumentElement
{
    void Accept(IDocumentVisitor visitor);
}

interface IDocumentVisitor
{
    void VisitParagraph(Paragraph paragraph);
    void VisitHeading(Heading heading);
    void VisitImage(Image image);
}

// Elements
class Paragraph : IDocumentElement
{
    public string Text { get; }

    public Paragraph(string text) {
        Text = text;
    }

    public void Accept(IDocumentVisitor visitor)
    {
        // TODO: Call visitor.VisitParagraph(this)
    }
}

class Heading : IDocumentElement
{
    public string Text { get; }
    public int Level { get; }

    public Heading(string text, int level) {
        Text = text;
        Level = level;
    }

    public void Accept(IDocumentVisitor visitor)
    {
        // TODO: Call visitor.VisitHeading(this)
    }
}

class Image : IDocumentElement
{
    public string Url { get; }
    public string AltText { get; }

    public Image(string url, string altText) {
        Url = url;
        AltText = altText;
    }

    public void Accept(IDocumentVisitor visitor)
    {
        // TODO: Call visitor.VisitImage(this)
    }
}

// Visitors
class WordCountVisitor : IDocumentVisitor
{
    private int wordCount = 0;

    public int GetWordCount() {
        return wordCount;
    }

    public void VisitParagraph(Paragraph paragraph)
    {
        // TODO: Split paragraph text by spaces, add count to wordCount
    }

    public void VisitHeading(Heading heading)
    {
        // TODO: Split heading text by spaces, add count to wordCount
    }

    public void VisitImage(Image image)
    {
        // TODO: Images contribute 0 words, nothing to do
    }
}

class HtmlExportVisitor : IDocumentVisitor
{
    public void VisitParagraph(Paragraph paragraph)
    {
        // TODO: Print "<p>text</p>"
    }

    public void VisitHeading(Heading heading)
    {
        // TODO: Print "<h{level}>text</h{level}>"
    }

    public void VisitImage(Image image)
    {
        // TODO: Print "<img src=\"url\" alt=\"altText\" />"
    }
}

class Program
{
    static void Main(string[] args)
    {
        // var doc = new List<IDocumentElement>
        // {
        //     new Heading("My Document", 1),
        //     new Paragraph("This is the first paragraph with some text."),
        //     new Image("photo.jpg", "A photo"),
        //     new Paragraph("Another paragraph here.")
        // };

        // var counter = new WordCountVisitor();
        // foreach (var el in doc) el.Accept(counter);
        // Console.WriteLine($"Word count: {counter.GetWordCount()}");

        // var exporter = new HtmlExportVisitor();
        // foreach (var el in doc) el.Accept(exporter);
    }
}
```

```typescript
interface DocumentElement {
    accept(visitor: DocumentVisitor): void;
}

interface DocumentVisitor {
    visitParagraph(paragraph: Paragraph): void;
    visitHeading(heading: Heading): void;
    visitImage(image: Image): void;
}

// Elements
class Paragraph implements DocumentElement {
    readonly text: string;
    constructor(text: string) {
        this.text = text;
    }

    accept(visitor: DocumentVisitor): void {
        // TODO: Call visitor.visitParagraph(this)
    }
}

class Heading implements DocumentElement {
    readonly text: string;
    readonly level: number;
    constructor(text: string, level: number) {
        this.text = text;
        this.level = level;
    }

    accept(visitor: DocumentVisitor): void {
        // TODO: Call visitor.visitHeading(this)
    }
}

class Image implements DocumentElement {
    readonly url: string;
    readonly altText: string;
    constructor(url: string, altText: string) {
        this.url = url;
        this.altText = altText;
    }

    accept(visitor: DocumentVisitor): void {
        // TODO: Call visitor.visitImage(this)
    }
}

// Visitors
class WordCountVisitor implements DocumentVisitor {
    private wordCount: number = 0;

    getWordCount(): number {
        return this.wordCount;
    }

    visitParagraph(paragraph: Paragraph): void {
        // TODO: Split paragraph text by spaces, add count to wordCount
    }

    visitHeading(heading: Heading): void {
        // TODO: Split heading text by spaces, add count to wordCount
    }

    visitImage(image: Image): void {
        // TODO: Images contribute 0 words, nothing to do
    }
}

class HtmlExportVisitor implements DocumentVisitor {
    visitParagraph(paragraph: Paragraph): void {
        // TODO: Print "<p>text</p>"
    }

    visitHeading(heading: Heading): void {
        // TODO: Print "<h{level}>text</h{level}>"
    }

    visitImage(image: Image): void {
        // TODO: Print "<img src=\"url\" alt=\"altText\" />"
    }
}

// const doc: DocumentElement[] = [
//     new Heading("My Document", 1),
//     new Paragraph("This is the first paragraph with some text."),
//     new Image("photo.jpg", "A photo"),
//     new Paragraph("Another paragraph here.")
// ];

// const counter = new WordCountVisitor();
// for (const el of doc) el.accept(counter);
// console.log(`Word count: ${counter.getWordCount()}`);

// const exporter = new HtmlExportVisitor();
// for (const el of doc) el.accept(exporter);
```

#### Solutions

```java
import java.util.*;

interface DocumentElement {
    void accept(DocumentVisitor visitor);
}

interface DocumentVisitor {
    void visitParagraph(Paragraph paragraph);
    void visitHeading(Heading heading);
    void visitImage(Image image);
}

// Elements
class Paragraph implements DocumentElement {
    private String text;

    public Paragraph(String text) {
        this.text = text;
    }

    public String getText() { return text; }

    @Override
    public void accept(DocumentVisitor visitor) {
        visitor.visitParagraph(this);
    }
}

class Heading implements DocumentElement {
    private String text;
    private int level;

    public Heading(String text, int level) {
        this.text = text;
        this.level = level;
    }

    public String getText() { return text; }
    public int getLevel() { return level; }

    @Override
    public void accept(DocumentVisitor visitor) {
        visitor.visitHeading(this);
    }
}

class Image implements DocumentElement {
    private String url;
    private String altText;

    public Image(String url, String altText) {
        this.url = url;
        this.altText = altText;
    }

    public String getUrl() { return url; }
    public String getAltText() { return altText; }

    @Override
    public void accept(DocumentVisitor visitor) {
        visitor.visitImage(this);
    }
}

// Visitors
class WordCountVisitor implements DocumentVisitor {
    private int wordCount = 0;

    public int getWordCount() { return wordCount; }

    @Override
    public void visitParagraph(Paragraph paragraph) {
        wordCount += paragraph.getText().split(" ").length;
    }

    @Override
    public void visitHeading(Heading heading) {
        wordCount += heading.getText().split(" ").length;
    }

    @Override
    public void visitImage(Image image) {
        // Images contribute 0 words
    }
}

class HtmlExportVisitor implements DocumentVisitor {
    @Override
    public void visitParagraph(Paragraph paragraph) {
        System.out.println("<p>" + paragraph.getText() + "</p>");
    }

    @Override
    public void visitHeading(Heading heading) {
        System.out.println("<h" + heading.getLevel() + ">" + heading.getText() + "</h" + heading.getLevel() + ">");
    }

    @Override
    public void visitImage(Image image) {
        System.out.println("<img src=\"" + image.getUrl() + "\" alt=\"" + image.getAltText() + "\" />");
    }
}

public class Main {
    public static void main(String[] args) {
        List<DocumentElement> doc = List.of(
            new Heading("My Document", 1),
            new Paragraph("This is the first paragraph with some text."),
            new Image("photo.jpg", "A photo"),
            new Paragraph("Another paragraph here.")
        );

        WordCountVisitor counter = new WordCountVisitor();
        for (DocumentElement el : doc) el.accept(counter);
        System.out.println("Word count: " + counter.getWordCount());

        HtmlExportVisitor exporter = new HtmlExportVisitor();
        for (DocumentElement el : doc) el.accept(exporter);
    }
}
```

```python
from abc import ABC, abstractmethod

class DocumentElement(ABC):
    @abstractmethod
    def accept(self, visitor):
        pass

class DocumentVisitor(ABC):
    @abstractmethod
    def visit_paragraph(self, paragraph):
        pass

    @abstractmethod
    def visit_heading(self, heading):
        pass

    @abstractmethod
    def visit_image(self, image):
        pass

# Elements
class Paragraph(DocumentElement):
    def __init__(self, text):
        self.text = text

    def accept(self, visitor):
        visitor.visit_paragraph(self)

class Heading(DocumentElement):
    def __init__(self, text, level):
        self.text = text
        self.level = level

    def accept(self, visitor):
        visitor.visit_heading(self)

class Image(DocumentElement):
    def __init__(self, url, alt_text):
        self.url = url
        self.alt_text = alt_text

    def accept(self, visitor):
        visitor.visit_image(self)

# Visitors
class WordCountVisitor(DocumentVisitor):
    def __init__(self):
        self.word_count = 0

    def get_word_count(self):
        return self.word_count

    def visit_paragraph(self, paragraph):
        self.word_count += len(paragraph.text.split(" "))

    def visit_heading(self, heading):
        self.word_count += len(heading.text.split(" "))

    def visit_image(self, image):
        pass

class HtmlExportVisitor(DocumentVisitor):
    def visit_paragraph(self, paragraph):
        print(f"<p>{paragraph.text}</p>")

    def visit_heading(self, heading):
        print(f"<h{heading.level}>{heading.text}</h{heading.level}>")

    def visit_image(self, image):
        print(f'<img src="{image.url}" alt="{image.alt_text}" />')

if __name__ == "__main__":
    doc = [
        Heading("My Document", 1),
        Paragraph("This is the first paragraph with some text."),
        Image("photo.jpg", "A photo"),
        Paragraph("Another paragraph here.")
    ]

    counter = WordCountVisitor()
    for el in doc: el.accept(counter)
    print(f"Word count: {counter.get_word_count()}")

    exporter = HtmlExportVisitor()
    for el in doc: el.accept(exporter)
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cstdio>

using namespace std;

class DocumentVisitor;

class DocumentElement {
public:
    virtual void accept(DocumentVisitor* visitor) = 0;
    virtual ~DocumentElement() {}
};

class Paragraph;
class Heading;
class Image;

class DocumentVisitor {
public:
    virtual void visitParagraph(Paragraph* p) = 0;
    virtual void visitHeading(Heading* h) = 0;
    virtual void visitImage(Image* img) = 0;
    virtual ~DocumentVisitor() {}
};

// Elements
class Paragraph : public DocumentElement {
    string text;
public:
    Paragraph(const string& text) : text(text) {}

    const string& getText() const {
        return text;
    }

    void accept(DocumentVisitor* visitor) override {
        visitor->visitParagraph(this);
    }
};

class Heading : public DocumentElement {
    string text;
    int level;
public:
    Heading(const string& text, int level) : text(text), level(level) {}

    const string& getText() const {
        return text;
    }

    int getLevel() const {
        return level;
    }

    void accept(DocumentVisitor* visitor) override {
        visitor->visitHeading(this);
    }
};

class Image : public DocumentElement {
    string url;
    string altText;
public:
    Image(const string& url, const string& altText) : url(url), altText(altText) {}

    const string& getUrl() const {
        return url;
    }

    const string& getAltText() const {
        return altText;
    }

    void accept(DocumentVisitor* visitor) override {
        visitor->visitImage(this);
    }
};

// Helper to count words in a string
int countWords(const string& text) {
    int count = 0;
    bool inWord = false;
    for (char c : text) {
        if (c == ' ') {
            inWord = false;
        } else if (!inWord) {
            inWord = true;
            count++;
        }
    }
    return count;
}

// Visitors
class WordCountVisitor : public DocumentVisitor {
    int wordCount = 0;
public:
    int getWordCount() const {
        return wordCount;
    }

    void visitParagraph(Paragraph* p) override {
        wordCount += countWords(p->getText());
    }

    void visitHeading(Heading* h) override {
        wordCount += countWords(h->getText());
    }

    void visitImage(Image* img) override {
        // Images contribute 0 words
    }
};

class HtmlExportVisitor : public DocumentVisitor {
public:
    void visitParagraph(Paragraph* p) override {
        cout << "<p>" << p->getText() << "</p>" << endl;
    }

    void visitHeading(Heading* h) override {
        cout << "<h" << h->getLevel() << ">" << h->getText() << "</h" << h->getLevel() << ">" << endl;
    }

    void visitImage(Image* img) override {
        cout << "<img src=\"" << img->getUrl() << "\" alt=\"" << img->getAltText() << "\" />" << endl;
    }
};

int main() {
    vector<DocumentElement*> doc = {
        new Heading("My Document", 1),
        new Paragraph("This is the first paragraph with some text."),
        new Image("photo.jpg", "A photo"),
        new Paragraph("Another paragraph here.")
    };

    WordCountVisitor counter;
    for (auto el : doc) el->accept(&counter);
    printf("Word count: %d\n", counter.getWordCount());

    HtmlExportVisitor exporter;
    for (auto el : doc) el->accept(&exporter);

    for (auto el : doc) delete el;
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type DocumentElement interface {
	Accept(visitor DocumentVisitor)
}

type DocumentVisitor interface {
	VisitParagraph(paragraph *Paragraph)
	VisitHeading(heading *Heading)
	VisitImage(image *Image)
}

// Elements
type Paragraph struct {
	text string
}

func NewParagraph(text string) *Paragraph {
	return &Paragraph{text: text}
}

func (p *Paragraph) Text() string {
	return p.text
}

func (p *Paragraph) Accept(visitor DocumentVisitor) {
	visitor.VisitParagraph(p)
}

type Heading struct {
	text  string
	level int
}

func NewHeading(text string, level int) *Heading {
	return &Heading{text: text, level: level}
}

func (h *Heading) Text() string {
	return h.text
}

func (h *Heading) Level() int {
	return h.level
}

func (h *Heading) Accept(visitor DocumentVisitor) {
	visitor.VisitHeading(h)
}

type Image struct {
	url     string
	altText string
}

func NewImage(url, altText string) *Image {
	return &Image{url: url, altText: altText}
}

func (i *Image) Url() string {
	return i.url
}

func (i *Image) AltText() string {
	return i.altText
}

func (i *Image) Accept(visitor DocumentVisitor) {
	visitor.VisitImage(i)
}

// Visitors
type WordCountVisitor struct {
	wordCount int
}

func NewWordCountVisitor() *WordCountVisitor {
	return &WordCountVisitor{}
}

func (w *WordCountVisitor) GetWordCount() int {
	return w.wordCount
}

func countWords(text string) int {
	count := 0
	inWord := false
	for _, r := range text {
		if r == ' ' {
			inWord = false
		} else if !inWord {
			inWord = true
			count++
		}
	}
	return count
}

func (w *WordCountVisitor) VisitParagraph(paragraph *Paragraph) {
	w.wordCount += countWords(paragraph.Text())
}

func (w *WordCountVisitor) VisitHeading(heading *Heading) {
	w.wordCount += countWords(heading.Text())
}

func (w *WordCountVisitor) VisitImage(image *Image) {
	// Images contribute 0 words
}

type HtmlExportVisitor struct{}

func NewHtmlExportVisitor() *HtmlExportVisitor {
	return &HtmlExportVisitor{}
}

func (h *HtmlExportVisitor) VisitParagraph(paragraph *Paragraph) {
	fmt.Println("<p>" + paragraph.Text() + "</p>")
}

func (h *HtmlExportVisitor) VisitHeading(heading *Heading) {
	fmt.Printf("<h%d>%s</h%d>\n", heading.Level(), heading.Text(), heading.Level())
}

func (h *HtmlExportVisitor) VisitImage(image *Image) {
	fmt.Printf("<img src=\"%s\" alt=\"%s\" />\n", image.Url(), image.AltText())
}

func main() {
	doc := []DocumentElement{
		NewHeading("My Document", 1),
		NewParagraph("This is the first paragraph with some text."),
		NewImage("photo.jpg", "A photo"),
		NewParagraph("Another paragraph here."),
	}

	counter := NewWordCountVisitor()
	for _, el := range doc {
		el.Accept(counter)
	}
	fmt.Printf("Word count: %d\n", counter.GetWordCount())

	exporter := NewHtmlExportVisitor()
	for _, el := range doc {
		el.Accept(exporter)
	}

	_ = strings.Builder{}
}
```

```csharp
using System;
using System.Collections.Generic;

interface IDocumentElement
{
    void Accept(IDocumentVisitor visitor);
}

interface IDocumentVisitor
{
    void VisitParagraph(Paragraph paragraph);
    void VisitHeading(Heading heading);
    void VisitImage(Image image);
}

// Elements
class Paragraph : IDocumentElement
{
    public string Text { get; }

    public Paragraph(string text) {
        Text = text;
    }

    public void Accept(IDocumentVisitor visitor)
    {
        visitor.VisitParagraph(this);
    }
}

class Heading : IDocumentElement
{
    public string Text { get; }
    public int Level { get; }

    public Heading(string text, int level) {
        Text = text;
        Level = level;
    }

    public void Accept(IDocumentVisitor visitor)
    {
        visitor.VisitHeading(this);
    }
}

class Image : IDocumentElement
{
    public string Url { get; }
    public string AltText { get; }

    public Image(string url, string altText) {
        Url = url;
        AltText = altText;
    }

    public void Accept(IDocumentVisitor visitor)
    {
        visitor.VisitImage(this);
    }
}

// Visitors
class WordCountVisitor : IDocumentVisitor
{
    private int wordCount = 0;

    public int GetWordCount() {
        return wordCount;
    }

    public void VisitParagraph(Paragraph paragraph)
    {
        wordCount += paragraph.Text.Split(' ').Length;
    }

    public void VisitHeading(Heading heading)
    {
        wordCount += heading.Text.Split(' ').Length;
    }

    public void VisitImage(Image image)
    {
        // Images contribute 0 words
    }
}

class HtmlExportVisitor : IDocumentVisitor
{
    public void VisitParagraph(Paragraph paragraph)
    {
        Console.WriteLine($"<p>{paragraph.Text}</p>");
    }

    public void VisitHeading(Heading heading)
    {
        Console.WriteLine($"<h{heading.Level}>{heading.Text}</h{heading.Level}>");
    }

    public void VisitImage(Image image)
    {
        Console.WriteLine($"<img src=\"{image.Url}\" alt=\"{image.AltText}\" />");
    }
}

class Program
{
    static void Main(string[] args)
    {
        var doc = new List<IDocumentElement>
        {
            new Heading("My Document", 1),
            new Paragraph("This is the first paragraph with some text."),
            new Image("photo.jpg", "A photo"),
            new Paragraph("Another paragraph here.")
        };

        var counter = new WordCountVisitor();
        foreach (var el in doc) el.Accept(counter);
        Console.WriteLine($"Word count: {counter.GetWordCount()}");

        var exporter = new HtmlExportVisitor();
        foreach (var el in doc) el.Accept(exporter);
    }
}
```

```typescript
interface DocumentElement {
    accept(visitor: DocumentVisitor): void;
}

interface DocumentVisitor {
    visitParagraph(paragraph: Paragraph): void;
    visitHeading(heading: Heading): void;
    visitImage(image: Image): void;
}

// Elements
class Paragraph implements DocumentElement {
    readonly text: string;
    constructor(text: string) {
        this.text = text;
    }

    accept(visitor: DocumentVisitor): void {
        visitor.visitParagraph(this);
    }
}

class Heading implements DocumentElement {
    readonly text: string;
    readonly level: number;
    constructor(text: string, level: number) {
        this.text = text;
        this.level = level;
    }

    accept(visitor: DocumentVisitor): void {
        visitor.visitHeading(this);
    }
}

class Image implements DocumentElement {
    readonly url: string;
    readonly altText: string;
    constructor(url: string, altText: string) {
        this.url = url;
        this.altText = altText;
    }

    accept(visitor: DocumentVisitor): void {
        visitor.visitImage(this);
    }
}

// Visitors
class WordCountVisitor implements DocumentVisitor {
    private wordCount: number = 0;

    getWordCount(): number {
        return this.wordCount;
    }

    visitParagraph(paragraph: Paragraph): void {
        this.wordCount += paragraph.text.split(" ").length;
    }

    visitHeading(heading: Heading): void {
        this.wordCount += heading.text.split(" ").length;
    }

    visitImage(image: Image): void {
        // Images contribute 0 words
    }
}

class HtmlExportVisitor implements DocumentVisitor {
    visitParagraph(paragraph: Paragraph): void {
        console.log(`<p>${paragraph.text}</p>`);
    }

    visitHeading(heading: Heading): void {
        console.log(`<h${heading.level}>${heading.text}</h${heading.level}>`);
    }

    visitImage(image: Image): void {
        console.log(`<img src="${image.url}" alt="${image.altText}" />`);
    }
}

const doc: DocumentElement[] = [
    new Heading("My Document", 1),
    new Paragraph("This is the first paragraph with some text."),
    new Image("photo.jpg", "A photo"),
    new Paragraph("Another paragraph here.")
];

const counter = new WordCountVisitor();
for (const el of doc) el.accept(counter);
console.log(`Word count: ${counter.getWordCount()}`);

const exporter = new HtmlExportVisitor();
for (const el of doc) el.accept(exporter);
```

---

# Exercise 2: Tax Calculator Visitor

> [!PAYWALL] This content is for premium members only.

Build a product catalog with `Electronics`, `Food`, and `Clothing` elements. Implement a `TaxVisitor` that applies different tax rates per product category, and a `DiscountVisitor` that applies category-specific discounts.

**Requirements:**

- `Product` interface with `accept(visitor)` and `getPrice()`
- `Electronics` has `name`, `price`, and `warranty` (boolean)
- `Food` has `name`, `price`, and `isOrganic` (boolean)
- `Clothing` has `name`, `price`, and `size` (string)
- `TaxVisitor` applies: Electronics 15%, Food 5%, Clothing 10%. Prints `"{name}: ${price} + ${tax} tax = ${total}"`
- `DiscountVisitor` applies: Electronics with warranty get 10% off, organic food gets 5% off, clothing gets flat $3 off. Prints `"{name}: ${price} - ${discount} discount = ${final}"`

```java
interface Product {
    void accept(ProductVisitor visitor);
    double getPrice();
}

interface ProductVisitor {
    void visitElectronics(Electronics electronics);
    void visitFood(Food food);
    void visitClothing(Clothing clothing);
}

// Elements
class Electronics implements Product {
    private String name;
    private double price;
    private boolean warranty;

    public Electronics(String name, double price, boolean warranty) {
        this.name = name;
        this.price = price;
        this.warranty = warranty;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
    public boolean hasWarranty() { return warranty; }

    @Override
    public void accept(ProductVisitor visitor) {
        // TODO: Call visitor.visitElectronics(this)
    }
}

class Food implements Product {
    private String name;
    private double price;
    private boolean isOrganic;

    public Food(String name, double price, boolean isOrganic) {
        this.name = name;
        this.price = price;
        this.isOrganic = isOrganic;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
    public boolean isOrganic() { return isOrganic; }

    @Override
    public void accept(ProductVisitor visitor) {
        // TODO: Call visitor.visitFood(this)
    }
}

class Clothing implements Product {
    private String name;
    private double price;
    private String size;

    public Clothing(String name, double price, String size) {
        this.name = name;
        this.price = price;
        this.size = size;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getSize() { return size; }

    @Override
    public void accept(ProductVisitor visitor) {
        // TODO: Call visitor.visitClothing(this)
    }
}

// Visitors
class TaxVisitor implements ProductVisitor {
    @Override
    public void visitElectronics(Electronics electronics) {
        // TODO: Calculate 15% tax, print "name: $price + $tax tax = $total"
    }

    @Override
    public void visitFood(Food food) {
        // TODO: Calculate 5% tax, print "name: $price + $tax tax = $total"
    }

    @Override
    public void visitClothing(Clothing clothing) {
        // TODO: Calculate 10% tax, print "name: $price + $tax tax = $total"
    }
}

class DiscountVisitor implements ProductVisitor {
    @Override
    public void visitElectronics(Electronics electronics) {
        // TODO: If warranty, 10% off; else 0. Print "name: $price - $discount discount = $final"
    }

    @Override
    public void visitFood(Food food) {
        // TODO: If organic, 5% off; else 0. Print "name: $price - $discount discount = $final"
    }

    @Override
    public void visitClothing(Clothing clothing) {
        // TODO: Flat $3 off. Print "name: $price - $discount discount = $final"
    }
}

public class Main {
    public static void main(String[] args) {
        // List<Product> products = List.of(
        //     new Electronics("Laptop", 999.99, true),
        //     new Food("Organic Apples", 5.99, true),
        //     new Food("Chips", 3.49, false),
        //     new Clothing("T-Shirt", 25.00, "M")
        // );

        // System.out.println("=== Tax Report ===");
        // TaxVisitor taxVisitor = new TaxVisitor();
        // for (Product p : products) p.accept(taxVisitor);

        // System.out.println("\n=== Discount Report ===");
        // DiscountVisitor discountVisitor = new DiscountVisitor();
        // for (Product p : products) p.accept(discountVisitor);
    }
}
```

```python
from abc import ABC, abstractmethod

class Product(ABC):
    @abstractmethod
    def accept(self, visitor):
        pass

    @abstractmethod
    def get_price(self):
        pass

class ProductVisitor(ABC):
    @abstractmethod
    def visit_electronics(self, electronics):
        pass

    @abstractmethod
    def visit_food(self, food):
        pass

    @abstractmethod
    def visit_clothing(self, clothing):
        pass

# Elements
class Electronics(Product):
    def __init__(self, name, price, warranty):
        self.name = name
        self.price = price
        self.warranty = warranty

    def get_price(self):
        return self.price

    def accept(self, visitor):
        # TODO: Call visitor.visit_electronics(self)
        pass

class Food(Product):
    def __init__(self, name, price, is_organic):
        self.name = name
        self.price = price
        self.is_organic = is_organic

    def get_price(self):
        return self.price

    def accept(self, visitor):
        # TODO: Call visitor.visit_food(self)
        pass

class Clothing(Product):
    def __init__(self, name, price, size):
        self.name = name
        self.price = price
        self.size = size

    def get_price(self):
        return self.price

    def accept(self, visitor):
        # TODO: Call visitor.visit_clothing(self)
        pass

# Visitors
class TaxVisitor(ProductVisitor):
    def visit_electronics(self, electronics):
        # TODO: Calculate 15% tax, print "name: $price + $tax tax = $total"
        pass

    def visit_food(self, food):
        # TODO: Calculate 5% tax, print "name: $price + $tax tax = $total"
        pass

    def visit_clothing(self, clothing):
        # TODO: Calculate 10% tax, print "name: $price + $tax tax = $total"
        pass

class DiscountVisitor(ProductVisitor):
    def visit_electronics(self, electronics):
        # TODO: If warranty, 10% off; else 0. Print "name: $price - $discount discount = $final"
        pass

    def visit_food(self, food):
        # TODO: If organic, 5% off; else 0. Print "name: $price - $discount discount = $final"
        pass

    def visit_clothing(self, clothing):
        # TODO: Flat $3 off. Print "name: $price - $discount discount = $final"
        pass

if __name__ == "__main__":
    # products = [
    #     Electronics("Laptop", 999.99, True),
    #     Food("Organic Apples", 5.99, True),
    #     Food("Chips", 3.49, False),
    #     Clothing("T-Shirt", 25.00, "M")
    # ]

    # print("=== Tax Report ===")
    # tax_visitor = TaxVisitor()
    # for p in products: p.accept(tax_visitor)

    # print("\n=== Discount Report ===")
    # discount_visitor = DiscountVisitor()
    # for p in products: p.accept(discount_visitor)
    pass
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cstdio>

using namespace std;

class ProductVisitor;

class Product {
public:
    virtual void accept(ProductVisitor* visitor) = 0;
    virtual double getPrice() const = 0;
    virtual ~Product() {}
};

class Electronics;
class Food;
class Clothing;

class ProductVisitor {
public:
    virtual void visitElectronics(Electronics* e) = 0;
    virtual void visitFood(Food* f) = 0;
    virtual void visitClothing(Clothing* c) = 0;
    virtual ~ProductVisitor() {}
};

// Elements
class Electronics : public Product {
    string name;
    double price;
    bool warranty;
public:
    Electronics(const string& name, double price, bool warranty)
        : name(name), price(price), warranty(warranty) {}

    const string& getName() const {
        return name;
    }

    double getPrice() const override {
        return price;
    }

    bool hasWarranty() const {
        return warranty;
    }

    void accept(ProductVisitor* visitor) override {
        // TODO: Call visitor->visitElectronics(this)
    }
};

class Food : public Product {
    string name;
    double price;
    bool organic;
public:
    Food(const string& name, double price, bool organic)
        : name(name), price(price), organic(organic) {}

    const string& getName() const {
        return name;
    }

    double getPrice() const override {
        return price;
    }

    bool isOrganic() const {
        return organic;
    }

    void accept(ProductVisitor* visitor) override {
        // TODO: Call visitor->visitFood(this)
    }
};

class Clothing : public Product {
    string name;
    double price;
    string size;
public:
    Clothing(const string& name, double price, const string& size)
        : name(name), price(price), size(size) {}

    const string& getName() const {
        return name;
    }

    double getPrice() const override {
        return price;
    }

    const string& getSize() const {
        return size;
    }

    void accept(ProductVisitor* visitor) override {
        // TODO: Call visitor->visitClothing(this)
    }
};

// Visitors
class TaxVisitor : public ProductVisitor {
public:
    void visitElectronics(Electronics* e) override {
        // TODO: Calculate 15% tax, print "name: $price + $tax tax = $total"
    }

    void visitFood(Food* f) override {
        // TODO: Calculate 5% tax, print "name: $price + $tax tax = $total"
    }

    void visitClothing(Clothing* c) override {
        // TODO: Calculate 10% tax, print "name: $price + $tax tax = $total"
    }
};

class DiscountVisitor : public ProductVisitor {
public:
    void visitElectronics(Electronics* e) override {
        // TODO: If warranty, 10% off; else 0. Print "name: $price - $discount discount = $final"
    }

    void visitFood(Food* f) override {
        // TODO: If organic, 5% off; else 0. Print "name: $price - $discount discount = $final"
    }

    void visitClothing(Clothing* c) override {
        // TODO: Flat $3 off. Print "name: $price - $discount discount = $final"
    }
};

int main() {
    // vector<Product*> products = {
    //     new Electronics("Laptop", 999.99, true),
    //     new Food("Organic Apples", 5.99, true),
    //     new Food("Chips", 3.49, false),
    //     new Clothing("T-Shirt", 25.00, "M")
    // };

    // printf("=== Tax Report ===\n");
    // TaxVisitor taxVisitor;
    // for (auto p : products) p->accept(&taxVisitor);

    // printf("\n=== Discount Report ===\n");
    // DiscountVisitor discountVisitor;
    // for (auto p : products) p->accept(&discountVisitor);

    // for (auto p : products) delete p;
    return 0;
}
```

```go
package main

type Product interface {
	Accept(visitor ProductVisitor)
	GetPrice() float64
}

type ProductVisitor interface {
	VisitElectronics(electronics *Electronics)
	VisitFood(food *Food)
	VisitClothing(clothing *Clothing)
}

// Elements
type Electronics struct {
	name     string
	price    float64
	warranty bool
}

func NewElectronics(name string, price float64, warranty bool) *Electronics {
	return &Electronics{
		name:     name,
		price:    price,
		warranty: warranty,
	}
}

func (e *Electronics) GetName() string {
	return e.name
}

func (e *Electronics) GetPrice() float64 {
	return e.price
}

func (e *Electronics) HasWarranty() bool {
	return e.warranty
}

func (e *Electronics) Accept(visitor ProductVisitor) {
	// TODO: Call visitor.VisitElectronics(this)
}

type Food struct {
	name      string
	price     float64
	isOrganic bool
}

func NewFood(name string, price float64, isOrganic bool) *Food {
	return &Food{
		name:      name,
		price:     price,
		isOrganic: isOrganic,
	}
}

func (f *Food) GetName() string {
	return f.name
}

func (f *Food) GetPrice() float64 {
	return f.price
}

func (f *Food) IsOrganic() bool {
	return f.isOrganic
}

func (f *Food) Accept(visitor ProductVisitor) {
	// TODO: Call visitor.VisitFood(this)
}

type Clothing struct {
	name  string
	price float64
	size  string
}

func NewClothing(name string, price float64, size string) *Clothing {
	return &Clothing{
		name:  name,
		price: price,
		size:  size,
	}
}

func (c *Clothing) GetName() string {
	return c.name
}

func (c *Clothing) GetPrice() float64 {
	return c.price
}

func (c *Clothing) GetSize() string {
	return c.size
}

func (c *Clothing) Accept(visitor ProductVisitor) {
	// TODO: Call visitor.VisitClothing(this)
}

// Visitors
type TaxVisitor struct{}

func (t *TaxVisitor) VisitElectronics(electronics *Electronics) {
	// TODO: Calculate 15% tax, print "name: $price + $tax tax = $total"
}

func (t *TaxVisitor) VisitFood(food *Food) {
	// TODO: Calculate 5% tax, print "name: $price + $tax tax = $total"
}

func (t *TaxVisitor) VisitClothing(clothing *Clothing) {
	// TODO: Calculate 10% tax, print "name: $price + $tax tax = $total"
}

type DiscountVisitor struct{}

func (d *DiscountVisitor) VisitElectronics(electronics *Electronics) {
	// TODO: If warranty, 10% off; else 0. Print "name: $price - $discount discount = $final"
}

func (d *DiscountVisitor) VisitFood(food *Food) {
	// TODO: If organic, 5% off; else 0. Print "name: $price - $discount discount = $final"
}

func (d *DiscountVisitor) VisitClothing(clothing *Clothing) {
	// TODO: Flat $3 off. Print "name: $price - $discount discount = $final"
}

func main() {
	// products := []Product{
	// 	NewElectronics("Laptop", 999.99, true),
	// 	NewFood("Organic Apples", 5.99, true),
	// 	NewFood("Chips", 3.49, false),
	// 	NewClothing("T-Shirt", 25.00, "M"),
	// }

	// println("=== Tax Report ===")
	// taxVisitor := &TaxVisitor{}
	// for _, p := range products {
	// 	p.Accept(taxVisitor)
	// }

	// println("\n=== Discount Report ===")
	// discountVisitor := &DiscountVisitor{}
	// for _, p := range products {
	// 	p.Accept(discountVisitor)
	// }
}
```

```csharp
using System;
using System.Collections.Generic;

interface IProduct
{
    void Accept(IProductVisitor visitor);
    double GetPrice();
}

interface IProductVisitor
{
    void VisitElectronics(Electronics electronics);
    void VisitFood(Food food);
    void VisitClothing(Clothing clothing);
}

// Elements
class Electronics : IProduct
{
    public string Name { get; }
    private double price;
    public bool Warranty { get; }

    public Electronics(string name, double price, bool warranty)
    {
        Name = name;
        this.price = price;
        Warranty = warranty;
    }

    public double GetPrice() {
        return price;
    }

    public void Accept(IProductVisitor visitor)
    {
        // TODO: Call visitor.VisitElectronics(this)
    }
}

class Food : IProduct
{
    public string Name { get; }
    private double price;
    public bool IsOrganic { get; }

    public Food(string name, double price, bool isOrganic)
    {
        Name = name;
        this.price = price;
        IsOrganic = isOrganic;
    }

    public double GetPrice() {
        return price;
    }

    public void Accept(IProductVisitor visitor)
    {
        // TODO: Call visitor.VisitFood(this)
    }
}

class Clothing : IProduct
{
    public string Name { get; }
    private double price;
    public string Size { get; }

    public Clothing(string name, double price, string size)
    {
        Name = name;
        this.price = price;
        Size = size;
    }

    public double GetPrice() {
        return price;
    }

    public void Accept(IProductVisitor visitor)
    {
        // TODO: Call visitor.VisitClothing(this)
    }
}

// Visitors
class TaxVisitor : IProductVisitor
{
    public void VisitElectronics(Electronics electronics)
    {
        // TODO: Calculate 15% tax, print "name: $price + $tax tax = $total"
    }

    public void VisitFood(Food food)
    {
        // TODO: Calculate 5% tax, print "name: $price + $tax tax = $total"
    }

    public void VisitClothing(Clothing clothing)
    {
        // TODO: Calculate 10% tax, print "name: $price + $tax tax = $total"
    }
}

class DiscountVisitor : IProductVisitor
{
    public void VisitElectronics(Electronics electronics)
    {
        // TODO: If warranty, 10% off; else 0. Print "name: $price - $discount discount = $final"
    }

    public void VisitFood(Food food)
    {
        // TODO: If organic, 5% off; else 0. Print "name: $price - $discount discount = $final"
    }

    public void VisitClothing(Clothing clothing)
    {
        // TODO: Flat $3 off. Print "name: $price - $discount discount = $final"
    }
}

class Program
{
    static void Main(string[] args)
    {
        // var products = new List<IProduct>
        // {
        //     new Electronics("Laptop", 999.99, true),
        //     new Food("Organic Apples", 5.99, true),
        //     new Food("Chips", 3.49, false),
        //     new Clothing("T-Shirt", 25.00, "M")
        // };

        // Console.WriteLine("=== Tax Report ===");
        // var taxVisitor = new TaxVisitor();
        // foreach (var p in products) p.Accept(taxVisitor);

        // Console.WriteLine("\n=== Discount Report ===");
        // var discountVisitor = new DiscountVisitor();
        // foreach (var p in products) p.Accept(discountVisitor);
    }
}
```

```typescript
interface Product {
    accept(visitor: ProductVisitor): void;
    getPrice(): number;
}

interface ProductVisitor {
    visitElectronics(electronics: Electronics): void;
    visitFood(food: Food): void;
    visitClothing(clothing: Clothing): void;
}

// Elements
class Electronics implements Product {
    readonly name: string;
    private readonly price: number;
    readonly warranty: boolean;
    constructor(name: string, price: number, warranty: boolean) {
        this.name = name;
        this.price = price;
        this.warranty = warranty;
    }

    getPrice(): number {
        return this.price;
    }

    accept(visitor: ProductVisitor): void {
        // TODO: Call visitor.visitElectronics(this)
    }
}

class Food implements Product {
    readonly name: string;
    private readonly price: number;
    readonly isOrganic: boolean;
    constructor(name: string, price: number, isOrganic: boolean) {
        this.name = name;
        this.price = price;
        this.isOrganic = isOrganic;
    }

    getPrice(): number {
        return this.price;
    }

    accept(visitor: ProductVisitor): void {
        // TODO: Call visitor.visitFood(this)
    }
}

class Clothing implements Product {
    readonly name: string;
    private readonly price: number;
    readonly size: string;
    constructor(name: string, price: number, size: string) {
        this.name = name;
        this.price = price;
        this.size = size;
    }

    getPrice(): number {
        return this.price;
    }

    accept(visitor: ProductVisitor): void {
        // TODO: Call visitor.visitClothing(this)
    }
}

// Visitors
class TaxVisitor implements ProductVisitor {
    visitElectronics(electronics: Electronics): void {
        // TODO: Calculate 15% tax, print "name: $price + $tax tax = $total"
    }

    visitFood(food: Food): void {
        // TODO: Calculate 5% tax, print "name: $price + $tax tax = $total"
    }

    visitClothing(clothing: Clothing): void {
        // TODO: Calculate 10% tax, print "name: $price + $tax tax = $total"
    }
}

class DiscountVisitor implements ProductVisitor {
    visitElectronics(electronics: Electronics): void {
        // TODO: If warranty, 10% off; else 0. Print "name: $price - $discount discount = $final"
    }

    visitFood(food: Food): void {
        // TODO: If organic, 5% off; else 0. Print "name: $price - $discount discount = $final"
    }

    visitClothing(clothing: Clothing): void {
        // TODO: Flat $3 off. Print "name: $price - $discount discount = $final"
    }
}

// const products: Product[] = [
//     new Electronics("Laptop", 999.99, true),
//     new Food("Organic Apples", 5.99, true),
//     new Food("Chips", 3.49, false),
//     new Clothing("T-Shirt", 25.00, "M")
// ];

// console.log("=== Tax Report ===");
// const taxVisitor = new TaxVisitor();
// for (const p of products) p.accept(taxVisitor);

// console.log("\n=== Discount Report ===");
// const discountVisitor = new DiscountVisitor();
// for (const p of products) p.accept(discountVisitor);
```

#### Solutions

```java
import java.util.*;

interface Product {
    void accept(ProductVisitor visitor);
    double getPrice();
}

interface ProductVisitor {
    void visitElectronics(Electronics electronics);
    void visitFood(Food food);
    void visitClothing(Clothing clothing);
}

// Elements
class Electronics implements Product {
    private String name;
    private double price;
    private boolean warranty;

    public Electronics(String name, double price, boolean warranty) {
        this.name = name;
        this.price = price;
        this.warranty = warranty;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
    public boolean hasWarranty() { return warranty; }

    @Override
    public void accept(ProductVisitor visitor) {
        visitor.visitElectronics(this);
    }
}

class Food implements Product {
    private String name;
    private double price;
    private boolean isOrganic;

    public Food(String name, double price, boolean isOrganic) {
        this.name = name;
        this.price = price;
        this.isOrganic = isOrganic;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
    public boolean isOrganic() { return isOrganic; }

    @Override
    public void accept(ProductVisitor visitor) {
        visitor.visitFood(this);
    }
}

class Clothing implements Product {
    private String name;
    private double price;
    private String size;

    public Clothing(String name, double price, String size) {
        this.name = name;
        this.price = price;
        this.size = size;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
    public String getSize() { return size; }

    @Override
    public void accept(ProductVisitor visitor) {
        visitor.visitClothing(this);
    }
}

// Visitors
class TaxVisitor implements ProductVisitor {
    @Override
    public void visitElectronics(Electronics electronics) {
        double tax = electronics.getPrice() * 0.15;
        System.out.printf("%s: $%.2f + $%.2f tax = $%.2f%n", electronics.getName(), electronics.getPrice(), tax, electronics.getPrice() + tax);
    }

    @Override
    public void visitFood(Food food) {
        double tax = food.getPrice() * 0.05;
        System.out.printf("%s: $%.2f + $%.2f tax = $%.2f%n", food.getName(), food.getPrice(), tax, food.getPrice() + tax);
    }

    @Override
    public void visitClothing(Clothing clothing) {
        double tax = clothing.getPrice() * 0.10;
        System.out.printf("%s: $%.2f + $%.2f tax = $%.2f%n", clothing.getName(), clothing.getPrice(), tax, clothing.getPrice() + tax);
    }
}

class DiscountVisitor implements ProductVisitor {
    @Override
    public void visitElectronics(Electronics electronics) {
        double discount = electronics.hasWarranty() " electronics.getPrice() * 0.10 : 0;
        System.out.printf("%s: $%.2f - $%.2f discount = $%.2f%n", electronics.getName(), electronics.getPrice(), discount, electronics.getPrice() - discount);
    }

    @Override
    public void visitFood(Food food) {
        double discount = food.isOrganic() " food.getPrice() * 0.05 : 0;
        System.out.printf("%s: $%.2f - $%.2f discount = $%.2f%n", food.getName(), food.getPrice(), discount, food.getPrice() - discount);
    }

    @Override
    public void visitClothing(Clothing clothing) {
        double discount = 3.00;
        System.out.printf("%s: $%.2f - $%.2f discount = $%.2f%n", clothing.getName(), clothing.getPrice(), discount, clothing.getPrice() - discount);
    }
}

public class Main {
    public static void main(String[] args) {
        List<Product> products = List.of(
            new Electronics("Laptop", 999.99, true),
            new Food("Organic Apples", 5.99, true),
            new Food("Chips", 3.49, false),
            new Clothing("T-Shirt", 25.00, "M")
        );

        System.out.println("=== Tax Report ===");
        TaxVisitor taxVisitor = new TaxVisitor();
        for (Product p : products) p.accept(taxVisitor);

        System.out.println("\n=== Discount Report ===");
        DiscountVisitor discountVisitor = new DiscountVisitor();
        for (Product p : products) p.accept(discountVisitor);
    }
}
```

```python
from abc import ABC, abstractmethod

class Product(ABC):
    @abstractmethod
    def accept(self, visitor):
        pass

    @abstractmethod
    def get_price(self):
        pass

class ProductVisitor(ABC):
    @abstractmethod
    def visit_electronics(self, electronics):
        pass

    @abstractmethod
    def visit_food(self, food):
        pass

    @abstractmethod
    def visit_clothing(self, clothing):
        pass

# Elements
class Electronics(Product):
    def __init__(self, name, price, warranty):
        self.name = name
        self.price = price
        self.warranty = warranty

    def get_price(self):
        return self.price

    def accept(self, visitor):
        visitor.visit_electronics(self)

class Food(Product):
    def __init__(self, name, price, is_organic):
        self.name = name
        self.price = price
        self.is_organic = is_organic

    def get_price(self):
        return self.price

    def accept(self, visitor):
        visitor.visit_food(self)

class Clothing(Product):
    def __init__(self, name, price, size):
        self.name = name
        self.price = price
        self.size = size

    def get_price(self):
        return self.price

    def accept(self, visitor):
        visitor.visit_clothing(self)

# Visitors
class TaxVisitor(ProductVisitor):
    def visit_electronics(self, electronics):
        tax = electronics.price * 0.15
        print(f"{electronics.name}: ${electronics.price:.2f} + ${tax:.2f} tax = ${electronics.price + tax:.2f}")

    def visit_food(self, food):
        tax = food.price * 0.05
        print(f"{food.name}: ${food.price:.2f} + ${tax:.2f} tax = ${food.price + tax:.2f}")

    def visit_clothing(self, clothing):
        tax = clothing.price * 0.10
        print(f"{clothing.name}: ${clothing.price:.2f} + ${tax:.2f} tax = ${clothing.price + tax:.2f}")

class DiscountVisitor(ProductVisitor):
    def visit_electronics(self, electronics):
        discount = electronics.price * 0.10 if electronics.warranty else 0
        print(f"{electronics.name}: ${electronics.price:.2f} - ${discount:.2f} discount = ${electronics.price - discount:.2f}")

    def visit_food(self, food):
        discount = food.price * 0.05 if food.is_organic else 0
        print(f"{food.name}: ${food.price:.2f} - ${discount:.2f} discount = ${food.price - discount:.2f}")

    def visit_clothing(self, clothing):
        discount = 3.00
        print(f"{clothing.name}: ${clothing.price:.2f} - ${discount:.2f} discount = ${clothing.price - discount:.2f}")

if __name__ == "__main__":
    products = [
        Electronics("Laptop", 999.99, True),
        Food("Organic Apples", 5.99, True),
        Food("Chips", 3.49, False),
        Clothing("T-Shirt", 25.00, "M")
    ]

    print("=== Tax Report ===")
    tax_visitor = TaxVisitor()
    for p in products: p.accept(tax_visitor)

    print("\n=== Discount Report ===")
    discount_visitor = DiscountVisitor()
    for p in products: p.accept(discount_visitor)
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <cstdio>

using namespace std;

class ProductVisitor;

class Product {
public:
    virtual void accept(ProductVisitor* visitor) = 0;
    virtual double getPrice() const = 0;
    virtual ~Product() {}
};

class Electronics;
class Food;
class Clothing;

class ProductVisitor {
public:
    virtual void visitElectronics(Electronics* e) = 0;
    virtual void visitFood(Food* f) = 0;
    virtual void visitClothing(Clothing* c) = 0;
    virtual ~ProductVisitor() {}
};

// Elements
class Electronics : public Product {
    string name;
    double price;
    bool warranty;
public:
    Electronics(const string& name, double price, bool warranty)
        : name(name), price(price), warranty(warranty) {}

    const string& getName() const {
        return name;
    }

    double getPrice() const override {
        return price;
    }

    bool hasWarranty() const {
        return warranty;
    }

    void accept(ProductVisitor* visitor) override {
        visitor->visitElectronics(this);
    }
};

class Food : public Product {
    string name;
    double price;
    bool organic;
public:
    Food(const string& name, double price, bool organic)
        : name(name), price(price), organic(organic) {}

    const string& getName() const {
        return name;
    }

    double getPrice() const override {
        return price;
    }

    bool isOrganic() const {
        return organic;
    }

    void accept(ProductVisitor* visitor) override {
        visitor->visitFood(this);
    }
};

class Clothing : public Product {
    string name;
    double price;
    string size;
public:
    Clothing(const string& name, double price, const string& size)
        : name(name), price(price), size(size) {}

    const string& getName() const {
        return name;
    }

    double getPrice() const override {
        return price;
    }

    const string& getSize() const {
        return size;
    }

    void accept(ProductVisitor* visitor) override {
        visitor->visitClothing(this);
    }
};

// Visitors
class TaxVisitor : public ProductVisitor {
public:
    void visitElectronics(Electronics* e) override {
        double tax = e->getPrice() * 0.15;
        printf("%s: $%.2f + $%.2f tax = $%.2f\n", e->getName().c_str(), e->getPrice(), tax, e->getPrice() + tax);
    }

    void visitFood(Food* f) override {
        double tax = f->getPrice() * 0.05;
        printf("%s: $%.2f + $%.2f tax = $%.2f\n", f->getName().c_str(), f->getPrice(), tax, f->getPrice() + tax);
    }

    void visitClothing(Clothing* c) override {
        double tax = c->getPrice() * 0.10;
        printf("%s: $%.2f + $%.2f tax = $%.2f\n", c->getName().c_str(), c->getPrice(), tax, c->getPrice() + tax);
    }
};

class DiscountVisitor : public ProductVisitor {
public:
    void visitElectronics(Electronics* e) override {
        double discount = e->hasWarranty() " e->getPrice() * 0.10 : 0;
        printf("%s: $%.2f - $%.2f discount = $%.2f\n", e->getName().c_str(), e->getPrice(), discount, e->getPrice() - discount);
    }

    void visitFood(Food* f) override {
        double discount = f->isOrganic() " f->getPrice() * 0.05 : 0;
        printf("%s: $%.2f - $%.2f discount = $%.2f\n", f->getName().c_str(), f->getPrice(), discount, f->getPrice() - discount);
    }

    void visitClothing(Clothing* c) override {
        double discount = 3.00;
        printf("%s: $%.2f - $%.2f discount = $%.2f\n", c->getName().c_str(), c->getPrice(), discount, c->getPrice() - discount);
    }
};

int main() {
    vector<Product*> products = {
        new Electronics("Laptop", 999.99, true),
        new Food("Organic Apples", 5.99, true),
        new Food("Chips", 3.49, false),
        new Clothing("T-Shirt", 25.00, "M")
    };

    printf("=== Tax Report ===\n");
    TaxVisitor taxVisitor;
    for (auto p : products) p->accept(&taxVisitor);

    printf("\n=== Discount Report ===\n");
    DiscountVisitor discountVisitor;
    for (auto p : products) p->accept(&discountVisitor);

    for (auto p : products) delete p;
    return 0;
}
```

```go
package main

import "fmt"

type Product interface {
	Accept(visitor ProductVisitor)
	GetPrice() float64
}

type ProductVisitor interface {
	VisitElectronics(electronics *Electronics)
	VisitFood(food *Food)
	VisitClothing(clothing *Clothing)
}

// Elements
type Electronics struct {
	name     string
	price    float64
	warranty bool
}

func NewElectronics(name string, price float64, warranty bool) *Electronics {
	return &Electronics{name: name, price: price, warranty: warranty}
}

func (e *Electronics) GetName() string {
	return e.name
}

func (e *Electronics) GetPrice() float64 {
	return e.price
}

func (e *Electronics) HasWarranty() bool {
	return e.warranty
}

func (e *Electronics) Accept(visitor ProductVisitor) {
	visitor.VisitElectronics(e)
}

type Food struct {
	name      string
	price     float64
	isOrganic bool
}

func NewFood(name string, price float64, isOrganic bool) *Food {
	return &Food{name: name, price: price, isOrganic: isOrganic}
}

func (f *Food) GetName() string {
	return f.name
}

func (f *Food) GetPrice() float64 {
	return f.price
}

func (f *Food) IsOrganic() bool {
	return f.isOrganic
}

func (f *Food) Accept(visitor ProductVisitor) {
	visitor.VisitFood(f)
}

type Clothing struct {
	name  string
	price float64
	size  string
}

func NewClothing(name string, price float64, size string) *Clothing {
	return &Clothing{name: name, price: price, size: size}
}

func (c *Clothing) GetName() string {
	return c.name
}

func (c *Clothing) GetPrice() float64 {
	return c.price
}

func (c *Clothing) GetSize() string {
	return c.size
}

func (c *Clothing) Accept(visitor ProductVisitor) {
	visitor.VisitClothing(c)
}

// Visitors
type TaxVisitor struct{}

func (t *TaxVisitor) VisitElectronics(electronics *Electronics) {
	tax := electronics.GetPrice() * 0.15
	fmt.Printf("%s: $%.2f + $%.2f tax = $%.2f\n", electronics.GetName(), electronics.GetPrice(), tax, electronics.GetPrice()+tax)
}

func (t *TaxVisitor) VisitFood(food *Food) {
	tax := food.GetPrice() * 0.05
	fmt.Printf("%s: $%.2f + $%.2f tax = $%.2f\n", food.GetName(), food.GetPrice(), tax, food.GetPrice()+tax)
}

func (t *TaxVisitor) VisitClothing(clothing *Clothing) {
	tax := clothing.GetPrice() * 0.10
	fmt.Printf("%s: $%.2f + $%.2f tax = $%.2f\n", clothing.GetName(), clothing.GetPrice(), tax, clothing.GetPrice()+tax)
}

type DiscountVisitor struct{}

func (d *DiscountVisitor) VisitElectronics(electronics *Electronics) {
	discount := 0.0
	if electronics.HasWarranty() {
		discount = electronics.GetPrice() * 0.10
	}
	fmt.Printf("%s: $%.2f - $%.2f discount = $%.2f\n", electronics.GetName(), electronics.GetPrice(), discount, electronics.GetPrice()-discount)
}

func (d *DiscountVisitor) VisitFood(food *Food) {
	discount := 0.0
	if food.IsOrganic() {
		discount = food.GetPrice() * 0.05
	}
	fmt.Printf("%s: $%.2f - $%.2f discount = $%.2f\n", food.GetName(), food.GetPrice(), discount, food.GetPrice()-discount)
}

func (d *DiscountVisitor) VisitClothing(clothing *Clothing) {
	discount := 3.00
	fmt.Printf("%s: $%.2f - $%.2f discount = $%.2f\n", clothing.GetName(), clothing.GetPrice(), discount, clothing.GetPrice()-discount)
}

func main() {
	products := []Product{
		NewElectronics("Laptop", 999.99, true),
		NewFood("Organic Apples", 5.99, true),
		NewFood("Chips", 3.49, false),
		NewClothing("T-Shirt", 25.00, "M"),
	}

	fmt.Println("=== Tax Report ===")
	taxVisitor := &TaxVisitor{}
	for _, p := range products {
		p.Accept(taxVisitor)
	}

	fmt.Println()
	fmt.Println("=== Discount Report ===")
	discountVisitor := &DiscountVisitor{}
	for _, p := range products {
		p.Accept(discountVisitor)
	}
}
```

```csharp
using System;
using System.Collections.Generic;

interface IProduct
{
    void Accept(IProductVisitor visitor);
    double GetPrice();
}

interface IProductVisitor
{
    void VisitElectronics(Electronics electronics);
    void VisitFood(Food food);
    void VisitClothing(Clothing clothing);
}

// Elements
class Electronics : IProduct
{
    public string Name { get; }
    private double price;
    public bool Warranty { get; }

    public Electronics(string name, double price, bool warranty)
    {
        Name = name;
        this.price = price;
        Warranty = warranty;
    }

    public double GetPrice() {
        return price;
    }

    public void Accept(IProductVisitor visitor)
    {
        visitor.VisitElectronics(this);
    }
}

class Food : IProduct
{
    public string Name { get; }
    private double price;
    public bool IsOrganic { get; }

    public Food(string name, double price, bool isOrganic)
    {
        Name = name;
        this.price = price;
        IsOrganic = isOrganic;
    }

    public double GetPrice() {
        return price;
    }

    public void Accept(IProductVisitor visitor)
    {
        visitor.VisitFood(this);
    }
}

class Clothing : IProduct
{
    public string Name { get; }
    private double price;
    public string Size { get; }

    public Clothing(string name, double price, string size)
    {
        Name = name;
        this.price = price;
        Size = size;
    }

    public double GetPrice() {
        return price;
    }

    public void Accept(IProductVisitor visitor)
    {
        visitor.VisitClothing(this);
    }
}

// Visitors
class TaxVisitor : IProductVisitor
{
    public void VisitElectronics(Electronics electronics)
    {
        double tax = electronics.GetPrice() * 0.15;
        Console.WriteLine($"{electronics.Name}: ${electronics.GetPrice():F2} + ${tax:F2} tax = ${electronics.GetPrice() + tax:F2}");
    }

    public void VisitFood(Food food)
    {
        double tax = food.GetPrice() * 0.05;
        Console.WriteLine($"{food.Name}: ${food.GetPrice():F2} + ${tax:F2} tax = ${food.GetPrice() + tax:F2}");
    }

    public void VisitClothing(Clothing clothing)
    {
        double tax = clothing.GetPrice() * 0.10;
        Console.WriteLine($"{clothing.Name}: ${clothing.GetPrice():F2} + ${tax:F2} tax = ${clothing.GetPrice() + tax:F2}");
    }
}

class DiscountVisitor : IProductVisitor
{
    public void VisitElectronics(Electronics electronics)
    {
        double discount = electronics.Warranty " electronics.GetPrice() * 0.10 : 0;
        Console.WriteLine($"{electronics.Name}: ${electronics.GetPrice():F2} - ${discount:F2} discount = ${electronics.GetPrice() - discount:F2}");
    }

    public void VisitFood(Food food)
    {
        double discount = food.IsOrganic " food.GetPrice() * 0.05 : 0;
        Console.WriteLine($"{food.Name}: ${food.GetPrice():F2} - ${discount:F2} discount = ${food.GetPrice() - discount:F2}");
    }

    public void VisitClothing(Clothing clothing)
    {
        double discount = 3.00;
        Console.WriteLine($"{clothing.Name}: ${clothing.GetPrice():F2} - ${discount:F2} discount = ${clothing.GetPrice() - discount:F2}");
    }
}

class Program
{
    static void Main(string[] args)
    {
        var products = new List<IProduct>
        {
            new Electronics("Laptop", 999.99, true),
            new Food("Organic Apples", 5.99, true),
            new Food("Chips", 3.49, false),
            new Clothing("T-Shirt", 25.00, "M")
        };

        Console.WriteLine("=== Tax Report ===");
        var taxVisitor = new TaxVisitor();
        foreach (var p in products) p.Accept(taxVisitor);

        Console.WriteLine("\n=== Discount Report ===");
        var discountVisitor = new DiscountVisitor();
        foreach (var p in products) p.Accept(discountVisitor);
    }
}
```

```typescript
interface Product {
    accept(visitor: ProductVisitor): void;
    getPrice(): number;
}

interface ProductVisitor {
    visitElectronics(electronics: Electronics): void;
    visitFood(food: Food): void;
    visitClothing(clothing: Clothing): void;
}

// Elements
class Electronics implements Product {
    readonly name: string;
    private readonly price: number;
    readonly warranty: boolean;
    constructor(name: string, price: number, warranty: boolean) {
        this.name = name;
        this.price = price;
        this.warranty = warranty;
    }

    getPrice(): number {
        return this.price;
    }

    accept(visitor: ProductVisitor): void {
        visitor.visitElectronics(this);
    }
}

class Food implements Product {
    readonly name: string;
    private readonly price: number;
    readonly isOrganic: boolean;
    constructor(name: string, price: number, isOrganic: boolean) {
        this.name = name;
        this.price = price;
        this.isOrganic = isOrganic;
    }

    getPrice(): number {
        return this.price;
    }

    accept(visitor: ProductVisitor): void {
        visitor.visitFood(this);
    }
}

class Clothing implements Product {
    readonly name: string;
    private readonly price: number;
    readonly size: string;
    constructor(name: string, price: number, size: string) {
        this.name = name;
        this.price = price;
        this.size = size;
    }

    getPrice(): number {
        return this.price;
    }

    accept(visitor: ProductVisitor): void {
        visitor.visitClothing(this);
    }
}

// Visitors
class TaxVisitor implements ProductVisitor {
    visitElectronics(electronics: Electronics): void {
        const tax = electronics.getPrice() * 0.15;
        console.log(`${electronics.name}: $${electronics.getPrice().toFixed(2)} + $${tax.toFixed(2)} tax = $${(electronics.getPrice() + tax).toFixed(2)}`);
    }

    visitFood(food: Food): void {
        const tax = food.getPrice() * 0.05;
        console.log(`${food.name}: $${food.getPrice().toFixed(2)} + $${tax.toFixed(2)} tax = $${(food.getPrice() + tax).toFixed(2)}`);
    }

    visitClothing(clothing: Clothing): void {
        const tax = clothing.getPrice() * 0.10;
        console.log(`${clothing.name}: $${clothing.getPrice().toFixed(2)} + $${tax.toFixed(2)} tax = $${(clothing.getPrice() + tax).toFixed(2)}`);
    }
}

class DiscountVisitor implements ProductVisitor {
    visitElectronics(electronics: Electronics): void {
        const discount = electronics.warranty " electronics.getPrice() * 0.10 : 0;
        console.log(`${electronics.name}: $${electronics.getPrice().toFixed(2)} - $${discount.toFixed(2)} discount = $${(electronics.getPrice() - discount).toFixed(2)}`);
    }

    visitFood(food: Food): void {
        const discount = food.isOrganic " food.getPrice() * 0.05 : 0;
        console.log(`${food.name}: $${food.getPrice().toFixed(2)} - $${discount.toFixed(2)} discount = $${(food.getPrice() - discount).toFixed(2)}`);
    }

    visitClothing(clothing: Clothing): void {
        const discount = 3.00;
        console.log(`${clothing.name}: $${clothing.getPrice().toFixed(2)} - $${discount.toFixed(2)} discount = $${(clothing.getPrice() - discount).toFixed(2)}`);
    }
}

const products: Product[] = [
    new Electronics("Laptop", 999.99, true),
    new Food("Organic Apples", 5.99, true),
    new Food("Chips", 3.49, false),
    new Clothing("T-Shirt", 25.00, "M")
];

console.log("=== Tax Report ===");
const taxVisitor = new TaxVisitor();
for (const p of products) p.accept(taxVisitor);

console.log("\n=== Discount Report ===");
const discountVisitor = new DiscountVisitor();
for (const p of products) p.accept(discountVisitor);
```

---

# Exercise 3: Expression Tree Visitor

Build an expression tree with `NumberExpr`, `AddExpr`, and `MultiplyExpr` nodes. Implement an `EvaluateVisitor` that computes the result, and a `PrintVisitor` that outputs the expression in infix notation with parentheses.

**Requirements:**

- `Expression` interface with `accept(visitor)` that returns a string (for PrintVisitor) or stores result in visitor
- `NumberExpr` has `value` (double)
- `AddExpr` has `left` and `right` (both `Expression`)
- `MultiplyExpr` has `left` and `right` (both `Expression`)
- `EvaluateVisitor` computes the numeric result recursively, exposes `getResult()`
- `PrintVisitor` builds a string like `"((2 + 3) * 4)"`, exposes `getResult()`
- Both visitors need to handle recursive traversal through composite expressions

```java
interface Expression {
    void accept(ExpressionVisitor visitor);
}

interface ExpressionVisitor {
    void visitNumber(NumberExpr number);
    void visitAdd(AddExpr add);
    void visitMultiply(MultiplyExpr multiply);
}

// Elements
class NumberExpr implements Expression {
    private double value;

    public NumberExpr(double value) {
        this.value = value;
    }

    public double getValue() { return value; }

    @Override
    public void accept(ExpressionVisitor visitor) {
        // TODO: Call visitor.visitNumber(this)
    }
}

class AddExpr implements Expression {
    private Expression left;
    private Expression right;

    public AddExpr(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public Expression getLeft() { return left; }
    public Expression getRight() { return right; }

    @Override
    public void accept(ExpressionVisitor visitor) {
        // TODO: Visit left, then right, then call visitor.visitAdd(this)
    }
}

class MultiplyExpr implements Expression {
    private Expression left;
    private Expression right;

    public MultiplyExpr(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public Expression getLeft() { return left; }
    public Expression getRight() { return right; }

    @Override
    public void accept(ExpressionVisitor visitor) {
        // TODO: Visit left, then right, then call visitor.visitMultiply(this)
    }
}

// Visitors
class EvaluateVisitor implements ExpressionVisitor {
    private java.util.Stack<Double> stack = new java.util.Stack<>();

    public double getResult() {
        // TODO: Return top of stack
        return 0;
    }

    @Override
    public void visitNumber(NumberExpr number) {
        // TODO: Push number value onto stack
    }

    @Override
    public void visitAdd(AddExpr add) {
        // TODO: Pop two values, push their sum
    }

    @Override
    public void visitMultiply(MultiplyExpr multiply) {
        // TODO: Pop two values, push their product
    }
}

class PrintVisitor implements ExpressionVisitor {
    private java.util.Stack<String> stack = new java.util.Stack<>();

    public String getResult() {
        // TODO: Return top of stack
        return "";
    }

    @Override
    public void visitNumber(NumberExpr number) {
        // TODO: Push number value as string onto stack
    }

    @Override
    public void visitAdd(AddExpr add) {
        // TODO: Pop two strings, push "(left + right)"
    }

    @Override
    public void visitMultiply(MultiplyExpr multiply) {
        // TODO: Pop two strings, push "(left * right)"
    }
}

public class Main {
    public static void main(String[] args) {
        // Expression expr = new MultiplyExpr(
        //     new AddExpr(new NumberExpr(2), new NumberExpr(3)),
        //     new NumberExpr(4)
        // );

        // EvaluateVisitor evaluator = new EvaluateVisitor();
        // expr.accept(evaluator);
        // System.out.println("Result: " + evaluator.getResult());

        // PrintVisitor printer = new PrintVisitor();
        // expr.accept(printer);
        // System.out.println("Expression: " + printer.getResult());
    }
}
```

```python
from abc import ABC, abstractmethod

class Expression(ABC):
    @abstractmethod
    def accept(self, visitor):
        pass

class ExpressionVisitor(ABC):
    @abstractmethod
    def visit_number(self, number):
        pass

    @abstractmethod
    def visit_add(self, add):
        pass

    @abstractmethod
    def visit_multiply(self, multiply):
        pass

# Elements
class NumberExpr(Expression):
    def __init__(self, value):
        self.value = value

    def accept(self, visitor):
        # TODO: Call visitor.visit_number(self)
        pass

class AddExpr(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def accept(self, visitor):
        # TODO: Visit left, then right, then call visitor.visit_add(self)
        pass

class MultiplyExpr(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def accept(self, visitor):
        # TODO: Visit left, then right, then call visitor.visit_multiply(self)
        pass

# Visitors
class EvaluateVisitor(ExpressionVisitor):
    def __init__(self):
        self.stack = []

    def get_result(self):
        # TODO: Return top of stack
        return 0

    def visit_number(self, number):
        # TODO: Push number value onto stack
        pass

    def visit_add(self, add):
        # TODO: Pop two values, push their sum
        pass

    def visit_multiply(self, multiply):
        # TODO: Pop two values, push their product
        pass

class PrintVisitor(ExpressionVisitor):
    def __init__(self):
        self.stack = []

    def get_result(self):
        # TODO: Return top of stack
        return ""

    def visit_number(self, number):
        # TODO: Push number value as string onto stack
        pass

    def visit_add(self, add):
        # TODO: Pop two strings, push "(left + right)"
        pass

    def visit_multiply(self, multiply):
        # TODO: Pop two strings, push "(left * right)"
        pass

if __name__ == "__main__":
    # expr = MultiplyExpr(
    #     AddExpr(NumberExpr(2), NumberExpr(3)),
    #     NumberExpr(4)
    # )

    # evaluator = EvaluateVisitor()
    # expr.accept(evaluator)
    # print(f"Result: {evaluator.get_result()}")

    # printer = PrintVisitor()
    # expr.accept(printer)
    # print(f"Expression: {printer.get_result()}")
    pass
```

```cpp
#include <iostream>
#include <string>
#include <stack>
#include <cstdio>

using namespace std;

class ExpressionVisitor;

class Expression {
public:
    virtual void accept(ExpressionVisitor* visitor) = 0;
    virtual ~Expression() {}
};

class NumberExpr;
class AddExpr;
class MultiplyExpr;

class ExpressionVisitor {
public:
    virtual void visitNumber(NumberExpr* number) = 0;
    virtual void visitAdd(AddExpr* add) = 0;
    virtual void visitMultiply(MultiplyExpr* multiply) = 0;
    virtual ~ExpressionVisitor() {}
};

// Elements
class NumberExpr : public Expression {
    double value;
public:
    NumberExpr(double value) : value(value) {}

    double getValue() const {
        return value;
    }

    void accept(ExpressionVisitor* visitor) override {
        // TODO: Call visitor->visitNumber(this)
    }
};

class AddExpr : public Expression {
    Expression* left;
    Expression* right;
public:
    AddExpr(Expression* left, Expression* right) : left(left), right(right) {}

    Expression* getLeft() const {
        return left;
    }

    Expression* getRight() const {
        return right;
    }

    void accept(ExpressionVisitor* visitor) override {
        // TODO: Visit left, then right, then call visitor->visitAdd(this)
    }

    ~AddExpr() {
        delete left;
        delete right;
    }
};

class MultiplyExpr : public Expression {
    Expression* left;
    Expression* right;
public:
    MultiplyExpr(Expression* left, Expression* right) : left(left), right(right) {}

    Expression* getLeft() const {
        return left;
    }

    Expression* getRight() const {
        return right;
    }

    void accept(ExpressionVisitor* visitor) override {
        // TODO: Visit left, then right, then call visitor->visitMultiply(this)
    }

    ~MultiplyExpr() {
        delete left;
        delete right;
    }
};

// Visitors
class EvaluateVisitor : public ExpressionVisitor {
    stack<double> stk;
public:
    double getResult() {
        // TODO: Return top of stack
        return 0;
    }

    void visitNumber(NumberExpr* number) override {
        // TODO: Push number value onto stack
    }

    void visitAdd(AddExpr* add) override {
        // TODO: Pop two values, push their sum
    }

    void visitMultiply(MultiplyExpr* multiply) override {
        // TODO: Pop two values, push their product
    }
};

class PrintVisitor : public ExpressionVisitor {
    stack<string> stk;
public:
    string getResult() {
        // TODO: Return top of stack
        return "";
    }

    void visitNumber(NumberExpr* number) override {
        // TODO: Push number value as string onto stack
    }

    void visitAdd(AddExpr* add) override {
        // TODO: Pop two strings, push "(left + right)"
    }

    void visitMultiply(MultiplyExpr* multiply) override {
        // TODO: Pop two strings, push "(left * right)"
    }
};

int main() {
    // Expression* expr = new MultiplyExpr(
    //     new AddExpr(new NumberExpr(2), new NumberExpr(3)),
    //     new NumberExpr(4)
    // );

    // EvaluateVisitor evaluator;
    // expr->accept(&evaluator);
    // printf("Result: %.1f\n", evaluator.getResult());

    // PrintVisitor printer;
    // expr->accept(&printer);
    // printf("Expression: %s\n", printer.getResult().c_str());

    // delete expr;
    return 0;
}
```

```go
package main

import "fmt"

type Expression interface {
	Accept(visitor ExpressionVisitor)
}

type ExpressionVisitor interface {
	VisitNumber(number *NumberExpr)
	VisitAdd(add *AddExpr)
	VisitMultiply(multiply *MultiplyExpr)
}

// Elements
type NumberExpr struct {
	value float64
}

func NewNumberExpr(value float64) *NumberExpr {
	return &NumberExpr{value: value}
}

func (n *NumberExpr) GetValue() float64 {
	return n.value
}

func (n *NumberExpr) Accept(visitor ExpressionVisitor) {
	// TODO: Call visitor.VisitNumber(this)
}

type AddExpr struct {
	left  Expression
	right Expression
}

func NewAddExpr(left Expression, right Expression) *AddExpr {
	return &AddExpr{left: left, right: right}
}

func (a *AddExpr) GetLeft() Expression {
	return a.left
}

func (a *AddExpr) GetRight() Expression {
	return a.right
}

func (a *AddExpr) Accept(visitor ExpressionVisitor) {
	// TODO: Visit left, then right, then call visitor.VisitAdd(this)
}

type MultiplyExpr struct {
	left  Expression
	right Expression
}

func NewMultiplyExpr(left Expression, right Expression) *MultiplyExpr {
	return &MultiplyExpr{left: left, right: right}
}

func (m *MultiplyExpr) GetLeft() Expression {
	return m.left
}

func (m *MultiplyExpr) GetRight() Expression {
	return m.right
}

func (m *MultiplyExpr) Accept(visitor ExpressionVisitor) {
	// TODO: Visit left, then right, then call visitor.VisitMultiply(this)
}

// Visitors
type EvaluateVisitor struct {
	stack []float64
}

func NewEvaluateVisitor() *EvaluateVisitor {
	return &EvaluateVisitor{stack: make([]float64, 0)}
}

func (e *EvaluateVisitor) GetResult() float64 {
	// TODO: Return top of stack
	return 0
}

func (e *EvaluateVisitor) VisitNumber(number *NumberExpr) {
	// TODO: Push number value onto stack
}

func (e *EvaluateVisitor) VisitAdd(add *AddExpr) {
	// TODO: Pop two values, push their sum
}

func (e *EvaluateVisitor) VisitMultiply(multiply *MultiplyExpr) {
	// TODO: Pop two values, push their product
}

type PrintVisitor struct {
	stack []string
}

func NewPrintVisitor() *PrintVisitor {
	return &PrintVisitor{stack: make([]string, 0)}
}

func (p *PrintVisitor) GetResult() string {
	// TODO: Return top of stack
	return ""
}

func (p *PrintVisitor) VisitNumber(number *NumberExpr) {
	// TODO: Push number value as string onto stack
}

func (p *PrintVisitor) VisitAdd(add *AddExpr) {
	// TODO: Pop two strings, push "(left + right)"
}

func (p *PrintVisitor) VisitMultiply(multiply *MultiplyExpr) {
	// TODO: Pop two strings, push "(left * right)"
}

func main() {
	// expr := NewMultiplyExpr(
	// 	NewAddExpr(NewNumberExpr(2), NewNumberExpr(3)),
	// 	NewNumberExpr(4),
	// )

	// evaluator := NewEvaluateVisitor()
	// expr.Accept(evaluator)
	// fmt.Printf("Result: %.1f\n", evaluator.GetResult())

	// printer := NewPrintVisitor()
	// expr.Accept(printer)
	// fmt.Printf("Expression: %s\n", printer.GetResult())

	_ = fmt.Printf
}
```

```csharp
using System;
using System.Collections.Generic;

interface IExpression
{
    void Accept(IExpressionVisitor visitor);
}

interface IExpressionVisitor
{
    void VisitNumber(NumberExpr number);
    void VisitAdd(AddExpr add);
    void VisitMultiply(MultiplyExpr multiply);
}

// Elements
class NumberExpr : IExpression
{
    public double Value { get; }

    public NumberExpr(double value) {
        Value = value;
    }

    public void Accept(IExpressionVisitor visitor)
    {
        // TODO: Call visitor.VisitNumber(this)
    }
}

class AddExpr : IExpression
{
    public IExpression Left { get; }
    public IExpression Right { get; }

    public AddExpr(IExpression left, IExpression right) {
        Left = left;
        Right = right;
    }

    public void Accept(IExpressionVisitor visitor)
    {
        // TODO: Visit Left, then Right, then call visitor.VisitAdd(this)
    }
}

class MultiplyExpr : IExpression
{
    public IExpression Left { get; }
    public IExpression Right { get; }

    public MultiplyExpr(IExpression left, IExpression right) {
        Left = left;
        Right = right;
    }

    public void Accept(IExpressionVisitor visitor)
    {
        // TODO: Visit Left, then Right, then call visitor.VisitMultiply(this)
    }
}

// Visitors
class EvaluateVisitor : IExpressionVisitor
{
    private Stack<double> stack = new Stack<double>();

    public double GetResult()
    {
        // TODO: Return top of stack
        return 0;
    }

    public void VisitNumber(NumberExpr number)
    {
        // TODO: Push number value onto stack
    }

    public void VisitAdd(AddExpr add)
    {
        // TODO: Pop two values, push their sum
    }

    public void VisitMultiply(MultiplyExpr multiply)
    {
        // TODO: Pop two values, push their product
    }
}

class PrintVisitor : IExpressionVisitor
{
    private Stack<string> stack = new Stack<string>();

    public string GetResult()
    {
        // TODO: Return top of stack
        return "";
    }

    public void VisitNumber(NumberExpr number)
    {
        // TODO: Push number value as string onto stack
    }

    public void VisitAdd(AddExpr add)
    {
        // TODO: Pop two strings, push "(left + right)"
    }

    public void VisitMultiply(MultiplyExpr multiply)
    {
        // TODO: Pop two strings, push "(left * right)"
    }
}

class Program
{
    static void Main(string[] args)
    {
        // IExpression expr = new MultiplyExpr(
        //     new AddExpr(new NumberExpr(2), new NumberExpr(3)),
        //     new NumberExpr(4)
        // );

        // var evaluator = new EvaluateVisitor();
        // expr.Accept(evaluator);
        // Console.WriteLine($"Result: {evaluator.GetResult()}");

        // var printer = new PrintVisitor();
        // expr.Accept(printer);
        // Console.WriteLine($"Expression: {printer.GetResult()}");
    }
}
```

```typescript
interface Expression {
    accept(visitor: ExpressionVisitor): void;
}

interface ExpressionVisitor {
    visitNumber(number: NumberExpr): void;
    visitAdd(add: AddExpr): void;
    visitMultiply(multiply: MultiplyExpr): void;
}

// Elements
class NumberExpr implements Expression {
    readonly value: number;
    constructor(value: number) {
        this.value = value;
    }

    accept(visitor: ExpressionVisitor): void {
        // TODO: Call visitor.visitNumber(this)
    }
}

class AddExpr implements Expression {
    readonly left: Expression;
    readonly right: Expression;
    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    accept(visitor: ExpressionVisitor): void {
        // TODO: Visit left, then right, then call visitor.visitAdd(this)
    }
}

class MultiplyExpr implements Expression {
    readonly left: Expression;
    readonly right: Expression;
    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    accept(visitor: ExpressionVisitor): void {
        // TODO: Visit left, then right, then call visitor.visitMultiply(this)
    }
}

// Visitors
class EvaluateVisitor implements ExpressionVisitor {
    private stack: number[] = [];

    getResult(): number {
        // TODO: Return top of stack
        return 0;
    }

    visitNumber(number: NumberExpr): void {
        // TODO: Push number value onto stack
    }

    visitAdd(add: AddExpr): void {
        // TODO: Pop two values, push their sum
    }

    visitMultiply(multiply: MultiplyExpr): void {
        // TODO: Pop two values, push their product
    }
}

class PrintVisitor implements ExpressionVisitor {
    private stack: string[] = [];

    getResult(): string {
        // TODO: Return top of stack
        return "";
    }

    visitNumber(number: NumberExpr): void {
        // TODO: Push number value as string onto stack
    }

    visitAdd(add: AddExpr): void {
        // TODO: Pop two strings, push "(left + right)"
    }

    visitMultiply(multiply: MultiplyExpr): void {
        // TODO: Pop two strings, push "(left * right)"
    }
}

// const expr: Expression = new MultiplyExpr(
//     new AddExpr(new NumberExpr(2), new NumberExpr(3)),
//     new NumberExpr(4)
// );

// const evaluator = new EvaluateVisitor();
// expr.accept(evaluator);
// console.log(`Result: ${evaluator.getResult()}`);

// const printer = new PrintVisitor();
// expr.accept(printer);
// console.log(`Expression: ${printer.getResult()}`);
```

#### Solutions

```java
interface Expression {
    void accept(ExpressionVisitor visitor);
}

interface ExpressionVisitor {
    void visitNumber(NumberExpr number);
    void visitAdd(AddExpr add);
    void visitMultiply(MultiplyExpr multiply);
}

// Elements
class NumberExpr implements Expression {
    private double value;

    public NumberExpr(double value) {
        this.value = value;
    }

    public double getValue() { return value; }

    @Override
    public void accept(ExpressionVisitor visitor) {
        visitor.visitNumber(this);
    }
}

class AddExpr implements Expression {
    private Expression left;
    private Expression right;

    public AddExpr(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public Expression getLeft() { return left; }
    public Expression getRight() { return right; }

    @Override
    public void accept(ExpressionVisitor visitor) {
        left.accept(visitor);
        right.accept(visitor);
        visitor.visitAdd(this);
    }
}

class MultiplyExpr implements Expression {
    private Expression left;
    private Expression right;

    public MultiplyExpr(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    public Expression getLeft() { return left; }
    public Expression getRight() { return right; }

    @Override
    public void accept(ExpressionVisitor visitor) {
        left.accept(visitor);
        right.accept(visitor);
        visitor.visitMultiply(this);
    }
}

// Visitors
class EvaluateVisitor implements ExpressionVisitor {
    private java.util.Stack<Double> stack = new java.util.Stack<>();

    public double getResult() {
        return stack.peek();
    }

    @Override
    public void visitNumber(NumberExpr number) {
        stack.push(number.getValue());
    }

    @Override
    public void visitAdd(AddExpr add) {
        double right = stack.pop();
        double left = stack.pop();
        stack.push(left + right);
    }

    @Override
    public void visitMultiply(MultiplyExpr multiply) {
        double right = stack.pop();
        double left = stack.pop();
        stack.push(left * right);
    }
}

class PrintVisitor implements ExpressionVisitor {
    private java.util.Stack<String> stack = new java.util.Stack<>();

    public String getResult() {
        return stack.peek();
    }

    @Override
    public void visitNumber(NumberExpr number) {
        stack.push(String.valueOf(number.getValue()));
    }

    @Override
    public void visitAdd(AddExpr add) {
        String right = stack.pop();
        String left = stack.pop();
        stack.push("(" + left + " + " + right + ")");
    }

    @Override
    public void visitMultiply(MultiplyExpr multiply) {
        String right = stack.pop();
        String left = stack.pop();
        stack.push("(" + left + " * " + right + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        Expression expr = new MultiplyExpr(
            new AddExpr(new NumberExpr(2), new NumberExpr(3)),
            new NumberExpr(4)
        );

        EvaluateVisitor evaluator = new EvaluateVisitor();
        expr.accept(evaluator);
        System.out.println("Result: " + evaluator.getResult());

        PrintVisitor printer = new PrintVisitor();
        expr.accept(printer);
        System.out.println("Expression: " + printer.getResult());
    }
}
```

```python
from abc import ABC, abstractmethod

class Expression(ABC):
    @abstractmethod
    def accept(self, visitor):
        pass

class ExpressionVisitor(ABC):
    @abstractmethod
    def visit_number(self, number):
        pass

    @abstractmethod
    def visit_add(self, add):
        pass

    @abstractmethod
    def visit_multiply(self, multiply):
        pass

# Elements
class NumberExpr(Expression):
    def __init__(self, value):
        self.value = value

    def accept(self, visitor):
        visitor.visit_number(self)

class AddExpr(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def accept(self, visitor):
        self.left.accept(visitor)
        self.right.accept(visitor)
        visitor.visit_add(self)

class MultiplyExpr(Expression):
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def accept(self, visitor):
        self.left.accept(visitor)
        self.right.accept(visitor)
        visitor.visit_multiply(self)

# Visitors
class EvaluateVisitor(ExpressionVisitor):
    def __init__(self):
        self.stack = []

    def get_result(self):
        return self.stack[-1]

    def visit_number(self, number):
        self.stack.append(float(number.value))

    def visit_add(self, add):
        right = self.stack.pop()
        left = self.stack.pop()
        self.stack.append(left + right)

    def visit_multiply(self, multiply):
        right = self.stack.pop()
        left = self.stack.pop()
        self.stack.append(left * right)

class PrintVisitor(ExpressionVisitor):
    def __init__(self):
        self.stack = []

    def get_result(self):
        return self.stack[-1]

    def visit_number(self, number):
        self.stack.append(str(float(number.value)))

    def visit_add(self, add):
        right = self.stack.pop()
        left = self.stack.pop()
        self.stack.append(f"({left} + {right})")

    def visit_multiply(self, multiply):
        right = self.stack.pop()
        left = self.stack.pop()
        self.stack.append(f"({left} * {right})")

if __name__ == "__main__":
    expr = MultiplyExpr(
        AddExpr(NumberExpr(2), NumberExpr(3)),
        NumberExpr(4)
    )

    evaluator = EvaluateVisitor()
    expr.accept(evaluator)
    print(f"Result: {evaluator.get_result()}")

    printer = PrintVisitor()
    expr.accept(printer)
    print(f"Expression: {printer.get_result()}")
```

```cpp
#include <iostream>
#include <string>
#include <stack>
#include <cstdio>

using namespace std;

class ExpressionVisitor;

class Expression {
public:
    virtual void accept(ExpressionVisitor* visitor) = 0;
    virtual ~Expression() {}
};

class NumberExpr;
class AddExpr;
class MultiplyExpr;

class ExpressionVisitor {
public:
    virtual void visitNumber(NumberExpr* number) = 0;
    virtual void visitAdd(AddExpr* add) = 0;
    virtual void visitMultiply(MultiplyExpr* multiply) = 0;
    virtual ~ExpressionVisitor() {}
};

// Elements
class NumberExpr : public Expression {
    double value;
public:
    NumberExpr(double value) : value(value) {}

    double getValue() const {
        return value;
    }

    void accept(ExpressionVisitor* visitor) override {
        visitor->visitNumber(this);
    }
};

class AddExpr : public Expression {
    Expression* left;
    Expression* right;
public:
    AddExpr(Expression* left, Expression* right) : left(left), right(right) {}

    Expression* getLeft() const {
        return left;
    }

    Expression* getRight() const {
        return right;
    }

    void accept(ExpressionVisitor* visitor) override {
        left->accept(visitor);
        right->accept(visitor);
        visitor->visitAdd(this);
    }

    ~AddExpr() {
        delete left;
        delete right;
    }
};

class MultiplyExpr : public Expression {
    Expression* left;
    Expression* right;
public:
    MultiplyExpr(Expression* left, Expression* right) : left(left), right(right) {}

    Expression* getLeft() const {
        return left;
    }

    Expression* getRight() const {
        return right;
    }

    void accept(ExpressionVisitor* visitor) override {
        left->accept(visitor);
        right->accept(visitor);
        visitor->visitMultiply(this);
    }

    ~MultiplyExpr() {
        delete left;
        delete right;
    }
};

// Visitors
class EvaluateVisitor : public ExpressionVisitor {
    stack<double> stk;
public:
    double getResult() {
        return stk.top();
    }

    void visitNumber(NumberExpr* number) override {
        stk.push(number->getValue());
    }

    void visitAdd(AddExpr* add) override {
        double right = stk.top();
        stk.pop();
        double left = stk.top();
        stk.pop();
        stk.push(left + right);
    }

    void visitMultiply(MultiplyExpr* multiply) override {
        double right = stk.top();
        stk.pop();
        double left = stk.top();
        stk.pop();
        stk.push(left * right);
    }
};

class PrintVisitor : public ExpressionVisitor {
    stack<string> stk;
public:
    string getResult() {
        return stk.top();
    }

    void visitNumber(NumberExpr* number) override {
        char buf[32];
        snprintf(buf, sizeof(buf), "%.1f", number->getValue());
        stk.push(string(buf));
    }

    void visitAdd(AddExpr* add) override {
        string right = stk.top();
        stk.pop();
        string left = stk.top();
        stk.pop();
        stk.push("(" + left + " + " + right + ")");
    }

    void visitMultiply(MultiplyExpr* multiply) override {
        string right = stk.top();
        stk.pop();
        string left = stk.top();
        stk.pop();
        stk.push("(" + left + " * " + right + ")");
    }
};

int main() {
    Expression* expr = new MultiplyExpr(
        new AddExpr(new NumberExpr(2), new NumberExpr(3)),
        new NumberExpr(4)
    );

    EvaluateVisitor evaluator;
    expr->accept(&evaluator);
    printf("Result: %.1f\n", evaluator.getResult());

    PrintVisitor printer;
    expr->accept(&printer);
    printf("Expression: %s\n", printer.getResult().c_str());

    delete expr;
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strconv"
)

// Expression represents an expression node.
type Expression interface {
	accept(visitor ExpressionVisitor)
}

// ExpressionVisitor defines operations over expression nodes.
type ExpressionVisitor interface {
	visitNumber(number *NumberExpr)
	visitAdd(add *AddExpr)
	visitMultiply(multiply *MultiplyExpr)
}

// Elements

type NumberExpr struct {
	value float64
}

func NewNumberExpr(value float64) *NumberExpr {
	return &NumberExpr{value: value}
}

func (n *NumberExpr) getValue() float64 {
	return n.value
}

func (n *NumberExpr) accept(visitor ExpressionVisitor) {
	visitor.visitNumber(n)
}

type AddExpr struct {
	left  Expression
	right Expression
}

func NewAddExpr(left, right Expression) *AddExpr {
	return &AddExpr{left: left, right: right}
}

func (a *AddExpr) getLeft() Expression {
	return a.left
}

func (a *AddExpr) getRight() Expression {
	return a.right
}

func (a *AddExpr) accept(visitor ExpressionVisitor) {
	a.left.accept(visitor)
	a.right.accept(visitor)
	visitor.visitAdd(a)
}

type MultiplyExpr struct {
	left  Expression
	right Expression
}

func NewMultiplyExpr(left, right Expression) *MultiplyExpr {
	return &MultiplyExpr{left: left, right: right}
}

func (m *MultiplyExpr) getLeft() Expression {
	return m.left
}

func (m *MultiplyExpr) getRight() Expression {
	return m.right
}

func (m *MultiplyExpr) accept(visitor ExpressionVisitor) {
	m.left.accept(visitor)
	m.right.accept(visitor)
	visitor.visitMultiply(m)
}

// Visitors

type EvaluateVisitor struct {
	stack []float64
}

func NewEvaluateVisitor() *EvaluateVisitor {
	return &EvaluateVisitor{stack: make([]float64, 0)}
}

func (e *EvaluateVisitor) getResult() float64 {
	return e.stack[len(e.stack)-1]
}

func (e *EvaluateVisitor) visitNumber(number *NumberExpr) {
	e.stack = append(e.stack, number.getValue())
}

func (e *EvaluateVisitor) visitAdd(add *AddExpr) {
	right := e.stack[len(e.stack)-1]
	e.stack = e.stack[:len(e.stack)-1]
	left := e.stack[len(e.stack)-1]
	e.stack = e.stack[:len(e.stack)-1]
	e.stack = append(e.stack, left+right)
}

func (e *EvaluateVisitor) visitMultiply(multiply *MultiplyExpr) {
	right := e.stack[len(e.stack)-1]
	e.stack = e.stack[:len(e.stack)-1]
	left := e.stack[len(e.stack)-1]
	e.stack = e.stack[:len(e.stack)-1]
	e.stack = append(e.stack, left*right)
}

type PrintVisitor struct {
	stack []string
}

func NewPrintVisitor() *PrintVisitor {
	return &PrintVisitor{stack: make([]string, 0)}
}

func (p *PrintVisitor) getResult() string {
	return p.stack[len(p.stack)-1]
}

func (p *PrintVisitor) visitNumber(number *NumberExpr) {
	p.stack = append(p.stack, strconv.FormatFloat(number.getValue(), 'f', 1, 64))
}

func (p *PrintVisitor) visitAdd(add *AddExpr) {
	right := p.stack[len(p.stack)-1]
	p.stack = p.stack[:len(p.stack)-1]
	left := p.stack[len(p.stack)-1]
	p.stack = p.stack[:len(p.stack)-1]
	p.stack = append(p.stack, "("+left+" + "+right+")")
}

func (p *PrintVisitor) visitMultiply(multiply *MultiplyExpr) {
	right := p.stack[len(p.stack)-1]
	p.stack = p.stack[:len(p.stack)-1]
	left := p.stack[len(p.stack)-1]
	p.stack = p.stack[:len(p.stack)-1]
	p.stack = append(p.stack, "("+left+" * "+right+")")
}

func main() {
	expr := NewMultiplyExpr(
		NewAddExpr(NewNumberExpr(2), NewNumberExpr(3)),
		NewNumberExpr(4),
	)

	evaluator := NewEvaluateVisitor()
	expr.accept(evaluator)
	fmt.Printf("Result: %.1f\n", evaluator.getResult())

	printer := NewPrintVisitor()
	expr.accept(printer)
	fmt.Printf("Expression: %s\n", printer.getResult())
}
```

```csharp
using System;
using System.Collections.Generic;

interface IExpression
{
    void Accept(IExpressionVisitor visitor);
}

interface IExpressionVisitor
{
    void VisitNumber(NumberExpr number);
    void VisitAdd(AddExpr add);
    void VisitMultiply(MultiplyExpr multiply);
}

// Elements
class NumberExpr : IExpression
{
    public double Value { get; }

    public NumberExpr(double value) {
        Value = value;
    }

    public void Accept(IExpressionVisitor visitor)
    {
        visitor.VisitNumber(this);
    }
}

class AddExpr : IExpression
{
    public IExpression Left { get; }
    public IExpression Right { get; }

    public AddExpr(IExpression left, IExpression right) {
        Left = left;
        Right = right;
    }

    public void Accept(IExpressionVisitor visitor)
    {
        Left.Accept(visitor);
        Right.Accept(visitor);
        visitor.VisitAdd(this);
    }
}

class MultiplyExpr : IExpression
{
    public IExpression Left { get; }
    public IExpression Right { get; }

    public MultiplyExpr(IExpression left, IExpression right) {
        Left = left;
        Right = right;
    }

    public void Accept(IExpressionVisitor visitor)
    {
        Left.Accept(visitor);
        Right.Accept(visitor);
        visitor.VisitMultiply(this);
    }
}

// Visitors
class EvaluateVisitor : IExpressionVisitor
{
    private Stack<double> stack = new Stack<double>();

    public double GetResult()
    {
        return stack.Peek();
    }

    public void VisitNumber(NumberExpr number)
    {
        stack.Push(number.Value);
    }

    public void VisitAdd(AddExpr add)
    {
        double right = stack.Pop();
        double left = stack.Pop();
        stack.Push(left + right);
    }

    public void VisitMultiply(MultiplyExpr multiply)
    {
        double right = stack.Pop();
        double left = stack.Pop();
        stack.Push(left * right);
    }
}

class PrintVisitor : IExpressionVisitor
{
    private Stack<string> stack = new Stack<string>();

    public string GetResult()
    {
        return stack.Peek();
    }

    public void VisitNumber(NumberExpr number)
    {
        stack.Push(number.Value.ToString("F1"));
    }

    public void VisitAdd(AddExpr add)
    {
        string right = stack.Pop();
        string left = stack.Pop();
        stack.Push($"({left} + {right})");
    }

    public void VisitMultiply(MultiplyExpr multiply)
    {
        string right = stack.Pop();
        string left = stack.Pop();
        stack.Push($"({left} * {right})");
    }
}

class Program
{
    static void Main(string[] args)
    {
        IExpression expr = new MultiplyExpr(
            new AddExpr(new NumberExpr(2), new NumberExpr(3)),
            new NumberExpr(4)
        );

        var evaluator = new EvaluateVisitor();
        expr.Accept(evaluator);
        Console.WriteLine($"Result: {evaluator.GetResult():F1}");

        var printer = new PrintVisitor();
        expr.Accept(printer);
        Console.WriteLine($"Expression: {printer.GetResult()}");
    }
}
```

```typescript
interface Expression {
    accept(visitor: ExpressionVisitor): void;
}

interface ExpressionVisitor {
    visitNumber(number: NumberExpr): void;
    visitAdd(add: AddExpr): void;
    visitMultiply(multiply: MultiplyExpr): void;
}

// Elements
class NumberExpr implements Expression {
    readonly value: number;
    constructor(value: number) {
        this.value = value;
    }

    accept(visitor: ExpressionVisitor): void {
        visitor.visitNumber(this);
    }
}

class AddExpr implements Expression {
    readonly left: Expression;
    readonly right: Expression;
    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    accept(visitor: ExpressionVisitor): void {
        this.left.accept(visitor);
        this.right.accept(visitor);
        visitor.visitAdd(this);
    }
}

class MultiplyExpr implements Expression {
    readonly left: Expression;
    readonly right: Expression;
    constructor(left: Expression, right: Expression) {
        this.left = left;
        this.right = right;
    }

    accept(visitor: ExpressionVisitor): void {
        this.left.accept(visitor);
        this.right.accept(visitor);
        visitor.visitMultiply(this);
    }
}

// Visitors
class EvaluateVisitor implements ExpressionVisitor {
    private stack: number[] = [];

    getResult(): number {
        return this.stack[this.stack.length - 1];
    }

    visitNumber(number: NumberExpr): void {
        this.stack.push(number.value);
    }

    visitAdd(add: AddExpr): void {
        const right = this.stack.pop()!;
        const left = this.stack.pop()!;
        this.stack.push(left + right);
    }

    visitMultiply(multiply: MultiplyExpr): void {
        const right = this.stack.pop()!;
        const left = this.stack.pop()!;
        this.stack.push(left * right);
    }
}

class PrintVisitor implements ExpressionVisitor {
    private stack: string[] = [];

    getResult(): string {
        return this.stack[this.stack.length - 1];
    }

    visitNumber(number: NumberExpr): void {
        this.stack.push(number.value.toFixed(1));
    }

    visitAdd(add: AddExpr): void {
        const right = this.stack.pop()!;
        const left = this.stack.pop()!;
        this.stack.push(`(${left} + ${right})`);
    }

    visitMultiply(multiply: MultiplyExpr): void {
        const right = this.stack.pop()!;
        const left = this.stack.pop()!;
        this.stack.push(`(${left} * ${right})`);
    }
}

const expr: Expression = new MultiplyExpr(
    new AddExpr(new NumberExpr(2), new NumberExpr(3)),
    new NumberExpr(4)
);

const evaluator = new EvaluateVisitor();
expr.accept(evaluator);
console.log(`Result: ${evaluator.getResult().toFixed(1)}`);

const printer = new PrintVisitor();
expr.accept(printer);
console.log(`Expression: ${printer.getResult()}`);
```


