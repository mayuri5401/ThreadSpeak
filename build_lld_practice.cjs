// ============================================================================
// Generator for 107 Low-Level Design (LLD) Practice Problems (AlgoMaster / LeetCode format)
// ============================================================================

const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  {
    id: "oop-fundamentals",
    title: "OOP Fundamentals",
    icon: "Boxes",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    desc: "Classes & Objects, State Management, Interfaces, Encapsulation, Abstraction, Inheritance & Polymorphism."
  },
  {
    id: "class-relationships",
    title: "Class Relationships",
    icon: "Network",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    desc: "Association, Aggregation (Has-A), Composition (Whole-Part) & Dependency (Uses-A) modeling."
  },
  {
    id: "design-principles",
    title: "Design Principles",
    icon: "CheckSquare",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    desc: "DRY, KISS, YAGNI, Law of Demeter, Separation of Concerns, High Cohesion & Loose Coupling."
  },
  {
    id: "solid-principles",
    title: "SOLID Principles",
    icon: "ShieldCheck",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    desc: "Single Responsibility (SRP), Open-Closed (OCP), Liskov Substitution (LSP), Interface Segregation (ISP) & DIP."
  },
  {
    id: "creational-patterns",
    title: "Creational Design Patterns",
    icon: "PlusCircle",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    desc: "Singleton, Builder, Factory Method, Abstract Factory & Prototype cloning patterns."
  },
  {
    id: "structural-patterns",
    title: "Structural Design Patterns",
    icon: "Layers",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    desc: "Adapter, Decorator, Facade, Composite, Proxy, Bridge & Flyweight patterns."
  },
  {
    id: "behavioral-patterns",
    title: "Behavioral Design Patterns",
    icon: "Activity",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    desc: "Strategy, Observer, State, Command, Template Method, Chain of Responsibility, Iterator, Mediator, Memento & Visitor."
  }
];

// Complete list of all 107 LLD Problems with detailed metadata
const ALL_107_RAW = [
  // 1. OOP Fundamentals (1-16)
  {
    num: 1,
    title: "Design Car Class",
    slug: "design-car-class",
    category: "oop-fundamentals",
    topics: ["Classes and Objects"],
    difficulty: "Easy",
    narrative: "Design a Car class that remembers both its identity and its current speed as it is driven. The brand and model stay the same for the lifetime of the object, while the speed changes after every acceleration or braking operation.",
    className: "Car",
    constructorSig: "public Car(String brand, String model)",
    methods: [
      { sig: "public int accelerate(int amount)", desc: "increases current speed by amount, stores the result, and returns the new speed." },
      { sig: "public int brake(int amount)", desc: "decreases current speed by amount, stores the result, and returns the new speed. If braking makes speed negative, set it to 0 instead." },
      { sig: "public int getSpeed()", desc: "returns the car's current speed without changing it." },
      { sig: "public String describe()", desc: "returns the latest state in the exact format \"<brand> <model> at <speed> km/h\"." }
    ],
    rules: [
      "All method calls operate on the same object instance.",
      "Accelerating by 20 and then by 15 produces a speed of 35, not 15.",
      "Braking by more than the current speed brings the car to a stop at 0."
    ],
    examples: [
      {
        input: "car = new Car(\"Toyota\", \"Corolla\")\ncar.describe()\ncar.accelerate(20)\ncar.getSpeed()",
        output: "[\"Toyota Corolla at 0 km/h\", 20, 20]",
        explanation: "A new car is standing still, so it describes itself at 0 km/h. After accelerating by 20 it holds that speed and reports it."
      },
      {
        input: "car = new Car(\"Tesla\", \"Model 3\")\ncar.accelerate(40)\ncar.accelerate(30)\ncar.brake(25)",
        output: "[40, 70, 45]",
        explanation: "Speeding up twice adds to what was already there, reaching 70, and braking by 25 brings it down to 45."
      }
    ],
    constraints: [
      "1 <= brand.length, model.length <= 20",
      "0 <= amount <= 100",
      "At most 100 calls in total are made across all methods."
    ],
    rubric: {
      passingScore: "7/10",
      fields: "Full marks when brand, model and speed are private fields, constructor initializes brand/model, and speed starts at zero.",
      stateMutation: "Full marks when accelerate and brake adjust the car's own speed field and return the new value.",
      structure: "Full marks when braking below zero clamps to zero and describe reads current values dynamically."
    },
    hints: [
      "Define private fields for `brand`, `model`, and `speed`.",
      "In the constructor, assign `this.brand = brand; this.model = model; this.speed = 0;`.",
      "In `brake(amount)`, use `this.speed = Math.max(0, this.speed - amount); return this.speed;`."
    ],
    testCases: [
      {
        name: "Case 1",
        calls: [
          { call: "new Car(\"Toyota\", \"Corolla\")", returns: "null" },
          { call: "describe()", returns: "\"Toyota Corolla at 0 km/h\"" },
          { call: "accelerate(20)", returns: "20" },
          { call: "getSpeed()", returns: "20" }
        ],
        input: "Car(\"Toyota\", \"Corolla\"), describe(), accelerate(20), getSpeed()",
        expectedOutput: "[\"Toyota Corolla at 0 km/h\", 20, 20]"
      },
      {
        name: "Case 2 (Clamping)",
        calls: [
          { call: "new Car(\"Ford\", \"Mustang\")", returns: "null" },
          { call: "accelerate(30)", returns: "30" },
          { call: "brake(50)", returns: "0" },
          { call: "getSpeed()", returns: "0" }
        ],
        input: "Car(\"Ford\", \"Mustang\"), accelerate(30), brake(50), getSpeed()",
        expectedOutput: "[30, 0, 0]"
      }
    ]
  },
  {
    num: 2,
    title: "Design Library Book Class",
    slug: "design-library-book",
    category: "oop-fundamentals",
    topics: ["Classes and Objects"],
    difficulty: "Easy",
    narrative: "Design a LibraryBook class that manages the checkout and return lifecycle of a physical book in a library system.",
    className: "LibraryBook",
    constructorSig: "public LibraryBook(String isbn, String title, String author)",
    methods: [
      { sig: "public boolean borrowBook(String borrower)", desc: "checks out book if available; returns true if successful, false if already borrowed." },
      { sig: "public boolean returnBook()", desc: "marks book as returned; returns true if previously borrowed, false if already available." },
      { sig: "public boolean isAvailable()", desc: "returns true if book is currently on shelf." },
      { sig: "public String getBorrower()", desc: "returns name of current borrower or null if available." }
    ]
  },
  {
    num: 3,
    title: "Design Traffic Light",
    slug: "design-traffic-light",
    category: "oop-fundamentals",
    topics: ["Enums", "State Management"],
    difficulty: "Easy",
    narrative: "Design a TrafficLight class using an enum state machine that transitions sequentially from RED to GREEN, GREEN to YELLOW, and YELLOW to RED.",
    className: "TrafficLight",
    constructorSig: "public TrafficLight(String initialColor)",
    methods: [
      { sig: "public String change()", desc: "advances light to next color in sequence (RED -> GREEN -> YELLOW -> RED) and returns new color." },
      { sig: "public String getColor()", desc: "returns the current active color." }
    ]
  },
  {
    num: 4,
    title: "Design Plugin Editor",
    slug: "design-plugin-editor",
    category: "oop-fundamentals",
    topics: ["Interfaces"],
    difficulty: "Easy",
    narrative: "Design a text editor plugin architecture using an EditorPlugin interface where registered plugins transform text buffers in order.",
    className: "PluginEditor",
    constructorSig: "public PluginEditor()",
    methods: [
      { sig: "public void registerPlugin(EditorPlugin plugin)", desc: "registers a text transformation plugin." },
      { sig: "public String applyPlugins(String text)", desc: "passes text through all registered plugins sequentially and returns result." }
    ]
  },
  {
    num: 5,
    title: "Design Bank Account",
    slug: "design-bank-account",
    category: "oop-fundamentals",
    topics: ["Encapsulation"],
    difficulty: "Easy",
    narrative: "Design a BankAccount class that enforces strict encapsulation on balance state with positive deposit and withdrawal guards.",
    className: "BankAccount",
    constructorSig: "public BankAccount(double initialBalance)",
    methods: [
      { sig: "public boolean deposit(double amount)", desc: "adds positive amount to balance; returns true if successful." },
      { sig: "public boolean withdraw(double amount)", desc: "withdraws amount if amount > 0 and balance >= amount; returns true if successful." },
      { sig: "public double getBalance()", desc: "returns current verified balance." }
    ]
  },
  {
    num: 6,
    title: "Design Temperature Sensor",
    slug: "design-temperature-sensor",
    category: "oop-fundamentals",
    topics: ["Encapsulation"],
    difficulty: "Easy",
    narrative: "Design a TemperatureSensor class that encapsulates temperature readings in Celsius while providing conversions to Fahrenheit and Kelvin.",
    className: "TemperatureSensor",
    constructorSig: "public TemperatureSensor(double celsius)",
    methods: [
      { sig: "public void setCelsius(double celsius)", desc: "updates temperature reading." },
      { sig: "public double getCelsius()", desc: "returns temperature in Celsius." },
      { sig: "public double getFahrenheit()", desc: "returns temperature converted to Fahrenheit (C * 9/5 + 32)." },
      { sig: "public double getKelvin()", desc: "returns temperature converted to Kelvin (C + 273.15)." }
    ]
  },
  {
    num: 7,
    title: "Design Shape Calculator",
    slug: "design-shape-calculator",
    category: "oop-fundamentals",
    topics: ["Abstraction"],
    difficulty: "Easy",
    narrative: "Design an abstract Shape class with concrete Circle and Rectangle implementations calculating area and perimeter.",
    className: "ShapeCalculator",
    constructorSig: "public ShapeCalculator()",
    methods: [
      { sig: "public double calculateTotalArea(java.util.List<Shape> shapes)", desc: "returns aggregate area across all polymorphic shapes." }
    ]
  },
  {
    num: 8,
    title: "Design Payment Methods",
    slug: "design-payment-methods",
    category: "oop-fundamentals",
    topics: ["Inheritance"],
    difficulty: "Easy",
    narrative: "Design a PaymentMethod inheritance hierarchy with CreditCardPayment and PayPalPayment classes inheriting base transaction audit fields.",
    className: "PaymentProcessor",
    constructorSig: "public PaymentProcessor()",
    methods: [
      { sig: "public boolean process(PaymentMethod method, double amount)", desc: "executes payment and logs transaction." }
    ]
  },
  {
    num: 9,
    title: "Design Notification Center",
    slug: "design-notification-center",
    category: "oop-fundamentals",
    topics: ["Polymorphism"],
    difficulty: "Easy",
    narrative: "Design a polymorphic notification dispatcher supporting Email, SMS, and Push notification sender implementations.",
    className: "NotificationCenter",
    constructorSig: "public NotificationCenter()",
    methods: [
      { sig: "public void addSender(NotificationSender sender)", desc: "registers sender strategy." },
      { sig: "public int broadcast(String message)", desc: "dispatches message across all registered channels." }
    ]
  },
  {
    num: 10,
    title: "Design Step Tracker Class",
    slug: "design-step-tracker",
    category: "oop-fundamentals",
    topics: ["Classes and Objects"],
    difficulty: "Medium",
    narrative: "Design a fitness StepTracker class that tracks daily step counts, active days (days with >= minActiveSteps), and cumulative averages.",
    className: "StepTracker",
    constructorSig: "public StepTracker(int minActiveSteps)",
    methods: [
      { sig: "public void addDailySteps(int steps)", desc: "records step count for a new day." },
      { sig: "public int activeDays()", desc: "returns count of days with steps >= minActiveSteps." },
      { sig: "public double averageSteps()", desc: "returns cumulative average steps per day." }
    ]
  },
  {
    num: 11,
    title: "Design Order Tracker",
    slug: "design-order-tracker",
    category: "oop-fundamentals",
    topics: ["Enums", "State Management"],
    difficulty: "Medium",
    narrative: "Design an OrderTracker finite state machine transitioning through CREATED -> PAID -> SHIPPED -> DELIVERED (or CANCELLED).",
    className: "OrderTracker",
    constructorSig: "public OrderTracker(String orderId)",
    methods: [
      { sig: "public boolean pay()", desc: "transitions CREATED to PAID." },
      { sig: "public boolean ship()", desc: "transitions PAID to SHIPPED." },
      { sig: "public boolean deliver()", desc: "transitions SHIPPED to DELIVERED." },
      { sig: "public boolean cancel()", desc: "cancels order if not yet shipped." },
      { sig: "public String getStatus()", desc: "returns current order status string." }
    ]
  },
  {
    num: 12,
    title: "Design Input Validator",
    slug: "design-input-validator",
    category: "oop-fundamentals",
    topics: ["Interfaces"],
    difficulty: "Medium",
    narrative: "Design a composite ValidationPipeline where multiple Validator rule objects inspect form payloads.",
    className: "InputValidator",
    constructorSig: "public InputValidator()",
    methods: [
      { sig: "public void addRule(ValidationRule rule)", desc: "appends validation rule." },
      { sig: "public boolean validate(String input)", desc: "returns true if input passes all registered rules." }
    ]
  },
  {
    num: 13,
    title: "Design Shopping Cart",
    slug: "design-shopping-cart",
    category: "oop-fundamentals",
    topics: ["Encapsulation"],
    difficulty: "Medium",
    narrative: "Design an e-commerce ShoppingCart class encapsulating item quantities, price calculations, item removals, and sales tax computation.",
    className: "ShoppingCart",
    constructorSig: "public ShoppingCart(double taxRate)",
    methods: [
      { sig: "public void addItem(String itemId, double price, int quantity)", desc: "adds or increments item in cart." },
      { sig: "public void removeItem(String itemId)", desc: "removes item completely." },
      { sig: "public double getTotal()", desc: "returns subtotal plus tax rate rounded to 2 decimals." }
    ]
  },
  {
    num: 14,
    title: "Design Event Exporter",
    slug: "design-event-exporter",
    category: "oop-fundamentals",
    topics: ["Abstraction"],
    difficulty: "Medium",
    narrative: "Design an abstract EventExporter with JsonEventExporter and CsvEventExporter formatting domain event streams.",
    className: "EventExporter",
    constructorSig: "public EventExporter()",
    methods: [
      { sig: "public String exportEvents(java.util.List<DomainEvent> events)", desc: "formats list of events according to concrete exporter." }
    ]
  },
  {
    num: 15,
    title: "Design Subscription Plans",
    slug: "design-subscription-plans",
    category: "oop-fundamentals",
    topics: ["Inheritance"],
    difficulty: "Medium",
    narrative: "Design a tiered SaaS subscription model with FreePlan, ProPlan, and EnterprisePlan inheriting from SubscriptionPlan.",
    className: "SubscriptionManager",
    constructorSig: "public SubscriptionManager()",
    methods: [
      { sig: "public boolean canAccessFeature(String userId, String feature)", desc: "checks user plan limits." }
    ]
  },
  {
    num: 16,
    title: "Design Discount Calculator",
    slug: "design-discount-calculator",
    category: "oop-fundamentals",
    topics: ["Polymorphism"],
    difficulty: "Medium",
    narrative: "Design a discount calculator applying PercentageDiscount, FixedAmountDiscount, and BuyOneGetOneDiscount strategies.",
    className: "DiscountEngine",
    constructorSig: "public DiscountEngine()",
    methods: [
      { sig: "public double applyBestDiscount(double originalPrice, java.util.List<DiscountPolicy> policies)", desc: "returns lowest discounted price." }
    ]
  },

  // 2. Class Relationships (17-25)
  {
    num: 17,
    title: "Design Course Registry",
    slug: "design-course-registry",
    category: "class-relationships",
    topics: ["Association"],
    difficulty: "Easy",
    narrative: "Design a bidirectional Student and Course association where students enroll in courses and courses maintain active student rosters.",
    className: "CourseRegistry",
    constructorSig: "public CourseRegistry()",
    methods: [
      { sig: "public boolean enroll(String studentId, String courseId)", desc: "associates student with course." },
      { sig: "public java.util.List<String> getCoursesForStudent(String studentId)", desc: "returns enrolled course list." }
    ]
  },
  {
    num: 18,
    title: "Design Playlist Library",
    slug: "design-playlist-library",
    category: "class-relationships",
    topics: ["Aggregation"],
    difficulty: "Easy",
    narrative: "Design a Playlist class that aggregates Song objects without owning their lifecycle (songs exist independently in library).",
    className: "PlaylistLibrary",
    constructorSig: "public PlaylistLibrary()",
    methods: [
      { sig: "public void createPlaylist(String name)", desc: "creates new empty playlist." },
      { sig: "public void addSongToPlaylist(String playlist, Song song)", desc: "aggregates song reference." }
    ]
  },
  {
    num: 19,
    title: "Design Slide Deck",
    slug: "design-slide-deck",
    category: "class-relationships",
    topics: ["Composition"],
    difficulty: "Easy",
    narrative: "Design a SlideDeck class that composedly owns Slide objects (slides cannot exist without their parent deck).",
    className: "SlideDeck",
    constructorSig: "public SlideDeck(String title)",
    methods: [
      { sig: "public void addSlide(String content)", desc: "creates and manages internal slide lifecycle." },
      { sig: "public int getSlideCount()", desc: "returns number of slides in deck." }
    ]
  },
  {
    num: 20,
    title: "Design Alert Preview",
    slug: "design-alert-preview",
    category: "class-relationships",
    topics: ["Dependency"],
    difficulty: "Easy",
    narrative: "Design an AlertPreview service with a method-level dependency on a Formatter utility (Dependency / Uses-A).",
    className: "AlertPreview",
    constructorSig: "public AlertPreview()",
    methods: [
      { sig: "public String formatAlert(Alert alert, AlertFormatter formatter)", desc: "uses formatter dependency to render output." }
    ]
  },
  {
    num: 21,
    title: "Design Team Directory",
    slug: "design-team-directory",
    category: "class-relationships",
    topics: ["Aggregation"],
    difficulty: "Medium",
    narrative: "Design a Department and Employee aggregation system where employees can transfer between departments.",
    className: "TeamDirectory",
    constructorSig: "public TeamDirectory()",
    methods: [
      { sig: "public void assignEmployee(String deptId, Employee emp)", desc: "aggregates employee into department." },
      { sig: "public void transferEmployee(String fromDept, String toDept, String empId)", desc: "moves employee." }
    ]
  },
  {
    num: 22,
    title: "Design Computer Workshop",
    slug: "design-computer-workshop",
    category: "class-relationships",
    topics: ["Composition"],
    difficulty: "Medium",
    narrative: "Design a Computer class composed of Motherboard, CPU, and RAM parts instantiated directly inside Computer constructor.",
    className: "ComputerWorkshop",
    constructorSig: "public ComputerWorkshop()",
    methods: [
      { sig: "public Computer buildGamingPC(String cpuModel, int ramGb)", desc: "constructs computer with strictly owned components." }
    ]
  },
  {
    num: 23,
    title: "Design Follow Graph",
    slug: "design-follow-graph",
    category: "class-relationships",
    topics: ["Association"],
    difficulty: "Medium",
    narrative: "Design a social network FollowGraph managing many-to-many follower and following associations between User entities.",
    className: "FollowGraph",
    constructorSig: "public FollowGraph()",
    methods: [
      { sig: "public void follow(String followerId, String followeeId)", desc: "creates follow association." },
      { sig: "public void unfollow(String followerId, String followeeId)", desc: "removes follow association." },
      { sig: "public java.util.List<String> getFollowers(String userId)", desc: "returns follower list." }
    ]
  },
  {
    num: 24,
    title: "Design Music Catalog",
    slug: "design-music-catalog",
    category: "class-relationships",
    topics: ["Aggregation"],
    difficulty: "Hard",
    narrative: "Design an Artist, Album, and Track aggregation hierarchy supporting cross-album track sharing and multi-artist collaborations.",
    className: "MusicCatalog",
    constructorSig: "public MusicCatalog()",
    methods: [
      { sig: "public void registerAlbum(Album album)", desc: "indexes album with aggregate track references." }
    ]
  },
  {
    num: 25,
    title: "Design Video Editor",
    slug: "design-video-editor",
    category: "class-relationships",
    topics: ["Composition"],
    difficulty: "Hard",
    narrative: "Design a VideoProject containing composite Tracks, TimelineClips, and Keyframes whose lifetimes are strictly tied to the project.",
    className: "VideoEditor",
    constructorSig: "public VideoEditor()",
    methods: [
      { sig: "public void addClipToTrack(String trackId, Clip clip)", desc: "adds clip under project composition." }
    ]
  },

  // 3. Design Principles (26-38)
  {
    num: 26,
    title: "Refactor Account Intake",
    slug: "refactor-account-intake",
    category: "design-principles",
    topics: ["DRY Principle"],
    difficulty: "Easy",
    narrative: "Refactor duplicated user signup, email verification, and audit logging routines into a single reusable onboarding helper.",
    className: "AccountIntakeService",
    constructorSig: "public AccountIntakeService()",
    methods: [
      { sig: "public boolean registerUser(String email, String password, String role)", desc: "consolidates onboarding pipeline." }
    ]
  },
  {
    num: 27,
    title: "Refactor Price Book",
    slug: "refactor-price-book",
    category: "design-principles",
    topics: ["DRY Principle"],
    difficulty: "Easy",
    narrative: "Eliminate repetitive currency conversions and rounding logic across international price books by extracting a CurrencyConverter utility.",
    className: "PriceBook",
    constructorSig: "public PriceBook()",
    methods: [
      { sig: "public double getLocalizedPrice(String sku, String targetCurrency)", desc: "computes unified localized price." }
    ]
  },
  {
    num: 28,
    title: "Refactor Delivery Fee",
    slug: "refactor-delivery-fee",
    category: "design-principles",
    topics: ["KISS Principle"],
    difficulty: "Easy",
    narrative: "Simplify an overengineered 50-condition delivery tariff calculation into clean, readable distance and weight tier formulas (Keep It Simple, Stupid).",
    className: "DeliveryFeeCalculator",
    constructorSig: "public DeliveryFeeCalculator()",
    methods: [
      { sig: "public double calculateFee(double distanceKm, double weightKg)", desc: "calculates delivery fee simply and predictably." }
    ]
  },
  {
    num: 29,
    title: "Refactor Login Guard",
    slug: "refactor-login-guard",
    category: "design-principles",
    topics: ["KISS Principle"],
    difficulty: "Easy",
    narrative: "Refactor complex nested boolean conditionals in authentication guard into clear guard clauses with early returns.",
    className: "LoginGuard",
    constructorSig: "public LoginGuard()",
    methods: [
      { sig: "public boolean canLogin(String user, String pass, boolean ipAllowed, int failedAttempts)", desc: "validates login with clean guard clauses." }
    ]
  },
  {
    num: 30,
    title: "Refactor Avatar Store",
    slug: "refactor-avatar-store",
    category: "design-principles",
    topics: ["YAGNI Principle"],
    difficulty: "Easy",
    narrative: "Strip out unused speculative microservice proxies and generic 3D asset loaders following You Aren't Gonna Need It (YAGNI).",
    className: "AvatarStore",
    constructorSig: "public AvatarStore()",
    methods: [
      { sig: "public String getAvatarUrl(String userId)", desc: "returns simple direct 2D avatar asset URL." }
    ]
  },
  {
    num: 31,
    title: "Refactor Password Checker",
    slug: "refactor-password-checker",
    category: "design-principles",
    topics: ["YAGNI Principle"],
    difficulty: "Easy",
    narrative: "Simplify over-architected regex factories and dynamic plugin checkers to satisfy standard length, digit, and symbol constraints.",
    className: "PasswordChecker",
    constructorSig: "public PasswordChecker()",
    methods: [
      { sig: "public boolean isStrong(String password)", desc: "validates password strength straightforwardly." }
    ]
  },
  {
    num: 32,
    title: "Refactor Climate Console",
    slug: "refactor-climate-console",
    category: "design-principles",
    topics: ["Law of Demeter"],
    difficulty: "Easy",
    narrative: "Fix Law of Demeter violations where callers chain `car.getDashboard().getClimate().getTemp().set(22)` by providing `car.setTargetTemperature(22)`.",
    className: "ClimateConsole",
    constructorSig: "public ClimateConsole(Car car)",
    methods: [
      { sig: "public void adjustCabinTemperature(int targetTemp)", desc: "talks only to immediate friends without deep chaining." }
    ]
  },
  {
    num: 33,
    title: "Refactor Project Dashboard",
    slug: "refactor-project-dashboard",
    category: "design-principles",
    topics: ["Law of Demeter"],
    difficulty: "Medium",
    narrative: "Refactor `company.getDepartment().getTeam().getLead().getEmail()` chaining by encapsulating team lead lookup on Company.",
    className: "ProjectDashboard",
    constructorSig: "public ProjectDashboard()",
    methods: [
      { sig: "public String getTeamLeadEmail(String companyId, String teamId)", desc: "retrieves lead email without leaking structure." }
    ]
  },
  {
    num: 34,
    title: "Refactor Shipping Desk",
    slug: "refactor-shipping-desk",
    category: "design-principles",
    topics: ["Law of Demeter"],
    difficulty: "Medium",
    narrative: "Prevent train wrecks in order shipping by having Order calculate its own shipping eligibility rather than inspecting customer address sub-fields.",
    className: "ShippingDesk",
    constructorSig: "public ShippingDesk()",
    methods: [
      { sig: "public boolean canShipOrder(Order order)", desc: "delegates to order directly." }
    ]
  },
  {
    num: 35,
    title: "Refactor Profile Service",
    slug: "refactor-profile-service",
    category: "design-principles",
    topics: ["Separation of Concerns"],
    difficulty: "Medium",
    narrative: "Separate database persistence, image resizing, and email notification responsibilities from a monolithic ProfileService into distinct classes.",
    className: "ProfileService",
    constructorSig: "public ProfileService(UserRepository userRepo, ImageResizer resizer, EmailNotifier notifier)",
    methods: [
      { sig: "public boolean updateProfile(String userId, byte[] avatarData, String bio)", desc: "coordinates single responsibility collaborators." }
    ]
  },
  {
    num: 36,
    title: "Refactor Expense Importer",
    slug: "refactor-expense-importer",
    category: "design-principles",
    topics: ["Separation of Concerns"],
    difficulty: "Medium",
    narrative: "Split a CSV parser, expense validator, and currency converter into decoupled modules.",
    className: "ExpenseImporter",
    constructorSig: "public ExpenseImporter()",
    methods: [
      { sig: "public int importExpenses(String csvContent)", desc: "parses, validates, and persists expense records cleanly." }
    ]
  },
  {
    num: 37,
    title: "Refactor Alert Router",
    slug: "refactor-alert-router",
    category: "design-principles",
    topics: ["Coupling and Cohesion"],
    difficulty: "Medium",
    narrative: "Refactor a tightly coupled AlertRouter by introducing high cohesion severity handlers and loosely coupled event emitters.",
    className: "AlertRouter",
    constructorSig: "public AlertRouter()",
    methods: [
      { sig: "public void routeAlert(Alert alert)", desc: "routes alert based on severity to registered listeners." }
    ]
  },
  {
    num: 38,
    title: "Refactor Payment Terminal",
    slug: "refactor-payment-terminal",
    category: "design-principles",
    topics: ["Coupling and Cohesion"],
    difficulty: "Medium",
    narrative: "Decouple payment hardware terminal drivers from business billing workflows using clear payment gateway abstractions.",
    className: "PaymentTerminal",
    constructorSig: "public PaymentTerminal(PaymentGateway gateway)",
    methods: [
      { sig: "public boolean processCardSwipe(CardData card, double amount)", desc: "processes card transaction loosely coupled from gateway." }
    ]
  },

  // 4. SOLID Principles (39-48)
  {
    num: 39,
    title: "Refactor Order Processing",
    slug: "refactor-order-processing",
    category: "solid-principles",
    topics: ["Single Responsibility"],
    difficulty: "Easy",
    narrative: "Decompose a God class that validates order, updates inventory, charges card, sends email, and logs stats into distinct single-responsibility classes.",
    className: "OrderProcessor",
    constructorSig: "public OrderProcessor(InventoryService inventory, PaymentGateway payment, EmailService email)",
    methods: [
      { sig: "public boolean processOrder(Order order)", desc: "delegates each step to dedicated responsibility handler." }
    ]
  },
  {
    num: 40,
    title: "Extend Grading Policy",
    slug: "extend-grading-policy",
    category: "solid-principles",
    topics: ["Open-Closed"],
    difficulty: "Easy",
    narrative: "Refactor an if-else grading calculator so new grading policies (Pass/Fail, Letter Grade, Curved Grade) can be added without modifying existing code (OCP).",
    className: "GradingPolicyEngine",
    constructorSig: "public GradingPolicyEngine()",
    methods: [
      { sig: "public String computeGrade(double score, GradingPolicy policy)", desc: "applies polymorphic grading policy without modifying engine." }
    ]
  },
  {
    num: 41,
    title: "Repair a Payment Contract",
    slug: "repair-payment-contract",
    category: "solid-principles",
    topics: ["Liskov-Substitution"],
    difficulty: "Easy",
    narrative: "Fix a Liskov Substitution violation where CryptoPayment threw UnsupportedOperationException on refund() by creating RefundablePayment interface.",
    className: "PaymentCoordinator",
    constructorSig: "public PaymentCoordinator()",
    methods: [
      { sig: "public boolean refundIfSupported(PaymentMethod payment, double amount)", desc: "guarantees substitutability of payment subtypes." }
    ]
  },
  {
    num: 42,
    title: "Refactor Plugin Lifecycle Hooks",
    slug: "refactor-plugin-lifecycle-hooks",
    category: "solid-principles",
    topics: ["Interface Segregation"],
    difficulty: "Easy",
    narrative: "Split a bloated 10-method Plugin interface into fine-grained StartablePlugin, ConfigurablePlugin, and RenderablePlugin interfaces (ISP).",
    className: "PluginManager",
    constructorSig: "public PluginManager()",
    methods: [
      { sig: "public void startPlugins(java.util.List<StartablePlugin> plugins)", desc: "runs start hook only for plugins implementing Startable." }
    ]
  },
  {
    num: 43,
    title: "Simplify a Counter Panel",
    slug: "simplify-counter-panel",
    category: "solid-principles",
    topics: ["Single Responsibility"],
    difficulty: "Medium",
    narrative: "Separate UI state tracking from persistence and audit analytics in a dashboard counter component.",
    className: "CounterPanel",
    constructorSig: "public CounterPanel()",
    methods: [
      { sig: "public void increment()", desc: "mutates count state while notifying listener." }
    ]
  },
  {
    num: 44,
    title: "Refactor a Text Pipeline",
    slug: "refactor-text-pipeline",
    category: "solid-principles",
    topics: ["Open-Closed"],
    difficulty: "Medium",
    narrative: "Design a text processing pipeline extensible with new filters (e.g. StemmingFilter, StopWordFilter) without modifying pipeline core.",
    className: "TextPipeline",
    constructorSig: "public TextPipeline()",
    methods: [
      { sig: "public void addFilter(TextFilter filter)", desc: "extends pipeline open for extension." },
      { sig: "public String process(String rawText)", desc: "executes filters closed for modification." }
    ]
  },
  {
    num: 45,
    title: "Repair a Document Contract",
    slug: "repair-document-contract",
    category: "solid-principles",
    topics: ["Liskov-Substitution"],
    difficulty: "Medium",
    narrative: "Resolve the classic ReadOnlyDocument vs EditableDocument subtype violation by segregating read and write contracts.",
    className: "DocumentEditor",
    constructorSig: "public DocumentEditor()",
    methods: [
      { sig: "public void edit(EditableDocument doc, String text)", desc: "accepts only valid editable document subtypes." }
    ]
  },
  {
    num: 46,
    title: "Refactor an Office Device Interface",
    slug: "refactor-office-device-interface",
    category: "solid-principles",
    topics: ["Interface Segregation"],
    difficulty: "Medium",
    narrative: "Break MultiFunctionPrinter interface into Printer, Scanner, and Fax interfaces so basic printer classes don't implement dummy scan/fax methods.",
    className: "OfficeDeviceHub",
    constructorSig: "public OfficeDeviceHub()",
    methods: [
      { sig: "public void printDocument(Printer printer, String doc)", desc: "depends strictly on Printer interface." }
    ]
  },
  {
    num: 47,
    title: "Narrow Report Dependencies",
    slug: "narrow-report-dependencies",
    category: "solid-principles",
    topics: ["Interface Segregation"],
    difficulty: "Medium",
    narrative: "Refactor ReportGenerator to depend on a narrow DataProvider interface rather than an entire full-featured DatabaseClient.",
    className: "ReportGenerator",
    constructorSig: "public ReportGenerator(DataProvider provider)",
    methods: [
      { sig: "public String generateSummary()", desc: "fetches data through narrow provider." }
    ]
  },
  {
    num: 48,
    title: "Refactor Member Signup",
    slug: "refactor-member-signup",
    category: "solid-principles",
    topics: ["Single Responsibility"],
    difficulty: "Hard",
    narrative: "Design a clean pipeline orchestrating Validation, PasswordHashing, UserPersistence, WelcomeNotification, and MetricEmission.",
    className: "MemberSignupService",
    constructorSig: "public MemberSignupService()",
    methods: [
      { sig: "public SignupResult signup(SignupRequest request)", desc: "orchestrates single responsibility collaborators." }
    ]
  },

  // 5. Creational Design Patterns (49-60)
  {
    num: 49,
    title: "Design an Application Config",
    slug: "design-application-config",
    category: "creational-patterns",
    topics: ["Singleton"],
    difficulty: "Easy",
    narrative: "Design a thread-safe Singleton AppConfig class managing global environment settings across all modules.",
    className: "AppConfig",
    constructorSig: "public static AppConfig getInstance()",
    methods: [
      { sig: "public String get(String key)", desc: "returns configuration property value." },
      { sig: "public void set(String key, String value)", desc: "updates configuration property." }
    ]
  },
  {
    num: 50,
    title: "Design a Shared Counter",
    slug: "design-shared-counter",
    category: "creational-patterns",
    topics: ["Singleton"],
    difficulty: "Easy",
    narrative: "Implement a thread-safe Singleton SharedCounter with lazy initialization and atomic count incrementation.",
    className: "SharedCounter",
    constructorSig: "public static SharedCounter getInstance()",
    methods: [
      { sig: "public int increment()", desc: "increments and returns singleton count." },
      { sig: "public int getCount()", desc: "returns current singleton count." }
    ]
  },
  {
    num: 51,
    title: "Implement Email Builder",
    slug: "implement-builder-email",
    category: "creational-patterns",
    topics: ["Builder"],
    difficulty: "Easy",
    narrative: "Implement the Builder pattern for constructing Email objects with optional recipients, cc, bcc, subject, body, and attachments.",
    className: "EmailBuilder",
    constructorSig: "public EmailBuilder()",
    methods: [
      { sig: "public EmailBuilder to(String recipient)", desc: "sets primary recipient." },
      { sig: "public EmailBuilder subject(String subject)", desc: "sets email subject." },
      { sig: "public EmailBuilder body(String body)", desc: "sets email body." },
      { sig: "public Email build()", desc: "validates and instantiates immutable Email." }
    ]
  },
  {
    num: 52,
    title: "Design Shape Factory",
    slug: "design-shape-factory",
    category: "creational-patterns",
    topics: ["Factory Method"],
    difficulty: "Easy",
    narrative: "Implement a Factory Method ShapeFactory producing Circle, Square, and Triangle instances based on string identifier.",
    className: "ShapeFactory",
    constructorSig: "public ShapeFactory()",
    methods: [
      { sig: "public Shape createShape(String shapeType)", desc: "instantiates concrete Shape matching type." }
    ]
  },
  {
    num: 53,
    title: "Design an Enemy Spawner",
    slug: "design-enemy-spawner",
    category: "creational-patterns",
    topics: ["Prototype"],
    difficulty: "Easy",
    narrative: "Implement the Prototype pattern to clone complex Enemy game objects with deep copied equipment and stats.",
    className: "EnemySpawner",
    constructorSig: "public EnemySpawner(Enemy prototype)",
    methods: [
      { sig: "public Enemy spawn(int healthMultiplier)", desc: "clones prototype enemy and applies stat modifier." }
    ]
  },
  {
    num: 54,
    title: "Design an ID Generator",
    slug: "design-id-generator",
    category: "creational-patterns",
    topics: ["Singleton"],
    difficulty: "Medium",
    narrative: "Design a thread-safe distributed ID Generator singleton producing monotonic sequential Snowflake-style identifiers.",
    className: "IdGenerator",
    constructorSig: "public static IdGenerator getInstance()",
    methods: [
      { sig: "public long nextId()", desc: "returns globally unique monotonic 64-bit ID." }
    ]
  },
  {
    num: 55,
    title: "Implement a Report Builder",
    slug: "implement-report-builder",
    category: "creational-patterns",
    topics: ["Builder"],
    difficulty: "Medium",
    narrative: "Design a multi-step ReportBuilder and ReportDirector generating PDF, HTML, and CSV executive summary reports.",
    className: "ReportBuilder",
    constructorSig: "public ReportBuilder()",
    methods: [
      { sig: "public ReportBuilder setHeader(String header)", desc: "sets report header." },
      { sig: "public ReportBuilder addSection(String title, String content)", desc: "appends section." },
      { sig: "public Report build()", desc: "builds report document." }
    ]
  },
  {
    num: 56,
    title: "Design Plugin System",
    slug: "design-plugin-system-factory",
    category: "creational-patterns",
    topics: ["Factory Method"],
    difficulty: "Medium",
    narrative: "Implement a Factory Method plugin registry where third-party developers register plugin factory creators by name.",
    className: "PluginFactoryRegistry",
    constructorSig: "public PluginFactoryRegistry()",
    methods: [
      { sig: "public void registerFactory(String name, PluginFactory factory)", desc: "registers factory." },
      { sig: "public Plugin createPlugin(String name)", desc: "instantiates plugin instance." }
    ]
  },
  {
    num: 57,
    title: "Design Theme Factory",
    slug: "design-factory-theme",
    category: "creational-patterns",
    topics: ["Abstract Factory"],
    difficulty: "Medium",
    narrative: "Implement an Abstract Factory GUIThemeFactory creating matching families of Buttons, TextBoxes, and ScrollBars for Dark and Light themes.",
    className: "ThemeFactory",
    constructorSig: "public static GUIThemeFactory getFactory(String theme)",
    methods: [
      { sig: "public Button createButton()", desc: "creates theme button." },
      { sig: "public TextBox createTextBox()", desc: "creates theme text box." }
    ]
  },
  {
    num: 58,
    title: "Design a Widget Palette",
    slug: "design-widget-palette",
    category: "creational-patterns",
    topics: ["Prototype"],
    difficulty: "Medium",
    narrative: "Implement a Prototype registry storing configured UI Widget templates (Button, Slider, Card) cloned during drag-and-drop operations.",
    className: "WidgetPalette",
    constructorSig: "public WidgetPalette()",
    methods: [
      { sig: "public void registerPrototype(String name, Widget prototype)", desc: "saves prototype." },
      { sig: "public Widget cloneWidget(String name)", desc: "returns deep copy of widget." }
    ]
  },
  {
    num: 59,
    title: "Implement a Pizza Builder and Director",
    slug: "implement-pizza-builder-and-director",
    category: "creational-patterns",
    topics: ["Builder"],
    difficulty: "Hard",
    narrative: "Implement PizzaBuilder with PizzaDirector orchestrating predefined recipes (Margherita, Pepperoni, BBQ Chicken).",
    className: "PizzaDirector",
    constructorSig: "public PizzaDirector(PizzaBuilder builder)",
    methods: [
      { sig: "public Pizza constructMargherita()", desc: "directs construction of Margherita pizza." }
    ]
  },
  {
    num: 60,
    title: "Design Cloud Provider Factory",
    slug: "design-cloud-provider-factory",
    category: "creational-patterns",
    topics: ["Abstract Factory"],
    difficulty: "Hard",
    narrative: "Implement an Abstract Factory CloudProviderFactory producing ComputeInstance, ObjectStorage, and RelationalDB for AWS, GCP, and Azure.",
    className: "CloudProviderFactory",
    constructorSig: "public static CloudFactory getProvider(String cloudName)",
    methods: [
      { sig: "public ComputeInstance createCompute()", desc: "creates cloud VM." },
      { sig: "public ObjectStorage createStorage()", desc: "creates cloud storage bucket." }
    ]
  },

  // 6. Structural Design Patterns (61-79)
  {
    num: 61,
    title: "Implement Temperature Adapter",
    slug: "implement-temperature-adapter",
    category: "structural-patterns",
    topics: ["Adapter"],
    difficulty: "Easy",
    narrative: "Implement an Adapter converting a legacy Fahrenheit temperature sensor output to the modern Celsius-based WeatherStation interface.",
    className: "FahrenheitToCelsiusAdapter",
    constructorSig: "public FahrenheitToCelsiusAdapter(FahrenheitSensor sensor)",
    methods: [
      { sig: "public double getTemperatureCelsius()", desc: "reads Fahrenheit and converts: (F - 32) * 5 / 9." }
    ]
  },
  {
    num: 62,
    title: "Implement Pizza Topping Decorators",
    slug: "implement-pizza-topping-decorators",
    category: "structural-patterns",
    topics: ["Decorator"],
    difficulty: "Easy",
    narrative: "Implement Decorator pattern wrapping a BasePizza with CheeseDecorator, MushroomDecorator, and JalapenoDecorator augmenting cost and description.",
    className: "PizzaDecoratorDemo",
    constructorSig: "public PizzaDecoratorDemo()",
    methods: [
      { sig: "public double calculatePrice(Pizza pizza)", desc: "returns total decorated price." }
    ]
  },
  {
    num: 63,
    title: "Implement a Legacy Payment Adapter",
    slug: "implement-legacy-payment-adapter",
    category: "structural-patterns",
    topics: ["Adapter"],
    difficulty: "Medium",
    narrative: "Implement an Adapter mapping the modern UnifiedPaymentProcessor API to an old XML-based LegacyBankingGateway.",
    className: "LegacyPaymentAdapter",
    constructorSig: "public LegacyPaymentAdapter(LegacyBankService legacyService)",
    methods: [
      { sig: "public PaymentResponse pay(PaymentRequest request)", desc: "adapts JSON DTO to legacy XML contract." }
    ]
  },
  {
    num: 64,
    title: "Implement Notification Adapter",
    slug: "implement-notification-adapter",
    category: "structural-patterns",
    topics: ["Adapter"],
    difficulty: "Medium",
    narrative: "Adapt third-party Twilio and SendGrid SDKs to implement our internal UnifiedNotificationService interface.",
    className: "TwilioNotificationAdapter",
    constructorSig: "public TwilioNotificationAdapter(TwilioClient client)",
    methods: [
      { sig: "public boolean send(String to, String msg)", desc: "adapts to Twilio SMS API." }
    ]
  },
  {
    num: 65,
    title: "Control a Home Theater",
    slug: "control-home-theater",
    category: "structural-patterns",
    topics: ["Facade"],
    difficulty: "Medium",
    narrative: "Design a HomeTheaterFacade simplifying complex interactions with TV, Soundbar, BluRayPlayer, Lights, and Projector into watchMovie() and endMovie().",
    className: "HomeTheaterFacade",
    constructorSig: "public HomeTheaterFacade(TV tv, Soundbar sound, Lights lights, BluRay player)",
    methods: [
      { sig: "public void watchMovie(String movie)", desc: "turns on TV, dims lights, sets surround sound, and plays movie." },
      { sig: "public void endMovie()", desc: "shuts down all systems and restores lighting." }
    ]
  },
  {
    num: 66,
    title: "Start a Computer",
    slug: "start-computer",
    category: "structural-patterns",
    topics: ["Facade"],
    difficulty: "Medium",
    narrative: "Implement ComputerFacade encapsulating CPU freeze, BIOS execution, Memory loading, and HDD jump routines into startComputer().",
    className: "ComputerFacade",
    constructorSig: "public ComputerFacade(CPU cpu, Memory ram, HardDrive hdd)",
    methods: [
      { sig: "public void start()", desc: "coordinates boot sequence facade." }
    ]
  },
  {
    num: 67,
    title: "Implement Character Abilities Decorator",
    slug: "implement-character-abilities-decorator",
    category: "structural-patterns",
    topics: ["Decorator"],
    difficulty: "Medium",
    narrative: "Implement game character decorators: ArmorBuffDecorator, SpeedBoostDecorator, and PoisonEffectDecorator wrapping BaseCharacter.",
    className: "CharacterDecoratorDemo",
    constructorSig: "public CharacterDecoratorDemo()",
    methods: [
      { sig: "public int getEffectiveAttack(Character character)", desc: "computes decorated attack power." }
    ]
  },
  {
    num: 68,
    title: "Implement Log Formatter Decorators",
    slug: "implement-log-formatter-decorators",
    category: "structural-patterns",
    topics: ["Decorator"],
    difficulty: "Medium",
    narrative: "Design decorators adding Timestamp, ThreadName, and ColorFormatting to base log message output.",
    className: "LogDecoratorDemo",
    constructorSig: "public LogDecoratorDemo()",
    methods: [
      { sig: "public String formatMessage(LogFormatter formatter, String msg)", desc: "applies decorator chain to log." }
    ]
  },
  {
    num: 69,
    title: "Design a Menu System",
    slug: "design-menu-system",
    category: "structural-patterns",
    topics: ["Composite"],
    difficulty: "Medium",
    narrative: "Implement the Composite pattern for a nested restaurant Menu where MenuItems and sub-Menus share the MenuComponent interface.",
    className: "MenuComponent",
    constructorSig: "public MenuComponent(String name)",
    methods: [
      { sig: "public void add(MenuComponent comp)", desc: "adds child item or submenu." },
      { sig: "public void print()", desc: "recursively displays menu hierarchy." }
    ]
  },
  {
    num: 70,
    title: "Design a File Tree",
    slug: "design-file-tree",
    category: "structural-patterns",
    topics: ["Composite"],
    difficulty: "Medium",
    narrative: "Implement the Composite pattern representing a file system where File and Directory classes share the FileSystemNode interface calculating total recursive size.",
    className: "DirectoryNode",
    constructorSig: "public DirectoryNode(String name)",
    methods: [
      { sig: "public void add(FileSystemNode node)", desc: "adds file or directory child." },
      { sig: "public long getSize()", desc: "returns total aggregate size." }
    ]
  },
  {
    num: 71,
    title: "Implement a Lazy Image Proxy",
    slug: "implement-lazy-image-proxy",
    category: "structural-patterns",
    topics: ["Proxy"],
    difficulty: "Medium",
    narrative: "Implement Proxy pattern where ImageProxy loads high-resolution RealImage from disk only upon the first call to display().",
    className: "ImageProxy",
    constructorSig: "public ImageProxy(String filename)",
    methods: [
      { sig: "public void display()", desc: "lazily loads real image on first call then displays." }
    ]
  },
  {
    num: 72,
    title: "Implement a Secure Report Proxy",
    slug: "implement-secure-report-proxy",
    category: "structural-patterns",
    topics: ["Proxy"],
    difficulty: "Medium",
    narrative: "Implement a Protection Proxy that verifies user role (ADMIN, MANAGER) before delegating to ConfidentialReportGenerator.",
    className: "SecureReportProxy",
    constructorSig: "public SecureReportProxy(User user)",
    methods: [
      { sig: "public String generateReport()", desc: "checks user permission before generating report." }
    ]
  },
  {
    num: 73,
    title: "Design a Shape Renderer",
    slug: "design-shape-renderer",
    category: "structural-patterns",
    topics: ["Bridge"],
    difficulty: "Medium",
    narrative: "Implement the Bridge pattern decoupling Shape abstractions (Circle, Square) from DrawingAPI implementations (RasterAPI, VectorAPI).",
    className: "ShapeBridgeDemo",
    constructorSig: "public ShapeBridgeDemo()",
    methods: [
      { sig: "public void drawShape(Shape shape)", desc: "bridges shape logic to drawing implementation." }
    ]
  },
  {
    num: 74,
    title: "Design Board Game Pieces",
    slug: "design-board-game-pieces",
    category: "structural-patterns",
    topics: ["Flyweight"],
    difficulty: "Medium",
    narrative: "Implement Flyweight pattern sharing intrinsic sprite textures and geometries across 10,000 extrinsic Soldier unit positions on a game board.",
    className: "PieceFlyweightFactory",
    constructorSig: "public static PieceFlyweight getPiece(String type)",
    methods: [
      { sig: "public void render(int x, int y, int health)", desc: "renders extrinsic piece state using shared intrinsic texture." }
    ]
  },
  {
    num: 75,
    title: "Design a Terrain Map",
    slug: "design-terrain-map",
    category: "structural-patterns",
    topics: ["Flyweight"],
    difficulty: "Medium",
    narrative: "Share Terrain (GRASS, WATER, DESERT) flyweight textures and movement cost objects across a 1,000,000-tile grid map.",
    className: "TerrainFactory",
    constructorSig: "public static Terrain getTerrain(String type)",
    methods: [
      { sig: "public double getMovementCost(int x, int y)", desc: "retrieves cost using shared terrain." }
    ]
  },
  {
    num: 76,
    title: "Design a Travel Booking System",
    slug: "design-travel-booking-system",
    category: "structural-patterns",
    topics: ["Facade"],
    difficulty: "Hard",
    narrative: "Implement TravelBookingFacade coordinating FlightBooking, HotelReservation, and CarRental services in an atomic multi-step booking.",
    className: "TravelBookingFacade",
    constructorSig: "public TravelBookingFacade()",
    methods: [
      { sig: "public boolean bookVacationPackage(String user, String dest, int days)", desc: "coordinates flight, hotel, and car facade." }
    ]
  },
  {
    num: 77,
    title: "Design an HTML Element Tree",
    slug: "design-html-element-tree",
    category: "structural-patterns",
    topics: ["Composite"],
    difficulty: "Hard",
    narrative: "Implement a DOM HTML element tree using Composite pattern supporting nested tags, attribute maps, and render() serialization.",
    className: "HTMLElement",
    constructorSig: "public HTMLElement(String tag)",
    methods: [
      { sig: "public void addChild(HTMLElement child)", desc: "adds nested DOM node." },
      { sig: "public String render()", desc: "recursively formats HTML tree string." }
    ]
  },
  {
    num: 78,
    title: "Design a Caching Weather Proxy",
    slug: "design-caching-weather-proxy",
    category: "structural-patterns",
    topics: ["Proxy"],
    difficulty: "Hard",
    narrative: "Implement a Caching Proxy wrapping a remote WeatherAPI that caches location forecasts for 15 minutes before refreshing.",
    className: "CachingWeatherProxy",
    constructorSig: "public CachingWeatherProxy(WeatherService remoteService)",
    methods: [
      { sig: "public String getForecast(String city)", desc: "serves from cache if valid, otherwise fetches and caches." }
    ]
  },
  {
    num: 79,
    title: "Design a Remote Control",
    slug: "design-remote-control",
    category: "structural-patterns",
    topics: ["Bridge"],
    difficulty: "Hard",
    narrative: "Bridge RemoteControl abstractions (BasicRemote, AdvancedRemote) to Device implementations (SonyTV, SamsungRadio) with power and channel operations.",
    className: "RemoteControl",
    constructorSig: "public RemoteControl(Device device)",
    methods: [
      { sig: "public void togglePower()", desc: "delegates power command to bridged device." },
      { sig: "public void setChannel(int channel)", desc: "delegates channel command." }
    ]
  },

  // 7. Behavioral Design Patterns (80-107)
  {
    num: 80,
    title: "Design a Discount Calculator",
    slug: "design-strategy-discount-calculator",
    category: "behavioral-patterns",
    topics: ["Strategy"],
    difficulty: "Easy",
    narrative: "Implement the Strategy pattern allowing runtime selection between NoDiscount, PercentageDiscount, and FixedAmountDiscount pricing algorithms.",
    className: "DiscountCalculator",
    constructorSig: "public DiscountCalculator(DiscountStrategy strategy)",
    methods: [
      { sig: "public void setStrategy(DiscountStrategy strategy)", desc: "swaps active pricing strategy at runtime." },
      { sig: "public double calculateFinalPrice(double originalPrice)", desc: "executes active strategy algorithm." }
    ]
  },
  {
    num: 81,
    title: "Design a Route Planner",
    slug: "design-route-planner",
    category: "behavioral-patterns",
    topics: ["Strategy"],
    difficulty: "Easy",
    narrative: "Implement RoutePlanner with Strategy pattern selecting between DrivingStrategy, WalkingStrategy, and PublicTransitStrategy.",
    className: "RoutePlanner",
    constructorSig: "public RoutePlanner(RouteStrategy strategy)",
    methods: [
      { sig: "public String planRoute(String start, String end)", desc: "generates route using selected navigation algorithm." }
    ]
  },
  {
    num: 82,
    title: "Design a Text Formatter",
    slug: "design-text-formatter",
    category: "behavioral-patterns",
    topics: ["Strategy"],
    difficulty: "Easy",
    narrative: "Implement TextFormatter with UpperCaseStrategy, LowerCaseStrategy, and TitleCaseStrategy text transformations.",
    className: "TextFormatterContext",
    constructorSig: "public TextFormatterContext()",
    methods: [
      { sig: "public String format(String text, TextFormatStrategy strategy)", desc: "applies formatting strategy to input text." }
    ]
  },
  {
    num: 83,
    title: "Design a Playlist Iterator",
    slug: "design-playlist-iterator",
    category: "behavioral-patterns",
    topics: ["Iterator"],
    difficulty: "Easy",
    narrative: "Implement the Iterator pattern with CustomPlaylistIterator traversing a song collection with hasNext() and next().",
    className: "PlaylistIterator",
    constructorSig: "public PlaylistIterator(java.util.List<Song> songs)",
    methods: [
      { sig: "public boolean hasNext()", desc: "returns true if more songs remain in playlist." },
      { sig: "public Song next()", desc: "returns next song and advances cursor." }
    ]
  },
  {
    num: 84,
    title: "Design a Newsletter Publisher",
    slug: "design-newsletter-publisher",
    category: "behavioral-patterns",
    topics: ["Observer"],
    difficulty: "Easy",
    narrative: "Implement Observer pattern with NewsletterPublisher notifying subscribed UserObserver objects when a new edition is published.",
    className: "NewsletterPublisher",
    constructorSig: "public NewsletterPublisher()",
    methods: [
      { sig: "public void subscribe(Observer observer)", desc: "registers new observer." },
      { sig: "public void unsubscribe(Observer observer)", desc: "removes observer." },
      { sig: "public void publish(String edition)", desc: "notifies all active observers with new content." }
    ]
  },
  {
    num: 85,
    title: "Design a Traffic Light State",
    slug: "design-state-traffic-light",
    category: "behavioral-patterns",
    topics: ["State"],
    difficulty: "Easy",
    narrative: "Implement State pattern modeling RedState, GreenState, and YellowState encapsulation on a TrafficLightContext.",
    className: "TrafficLightStateContext",
    constructorSig: "public TrafficLightStateContext()",
    methods: [
      { sig: "public void next()", desc: "delegates state transition to active state object." },
      { sig: "public String getColor()", desc: "returns current state representation." }
    ]
  },
  {
    num: 86,
    title: "Design a Beverage Station",
    slug: "design-beverage-station",
    category: "behavioral-patterns",
    topics: ["Template Method"],
    difficulty: "Easy",
    narrative: "Implement Template Method pattern in BeverageMaker with fixed algorithm (boilWater -> brew -> pourInCup -> addCondiments) overridden by Tea and Coffee subclasses.",
    className: "BeverageMaker",
    constructorSig: "public BeverageMaker()",
    methods: [
      { sig: "public void prepareRecipe()", desc: "executes template skeleton in fixed order." }
    ]
  },
  {
    num: 87,
    title: "Design an Undoable Counter",
    slug: "design-undoable-counter",
    category: "behavioral-patterns",
    topics: ["Memento"],
    difficulty: "Easy",
    narrative: "Implement the Memento pattern on CounterOriginator creating CounterMemento snapshots and restoring previous count states on undo().",
    className: "CounterOriginator",
    constructorSig: "public CounterOriginator()",
    methods: [
      { sig: "public void increment()", desc: "adds 1 to count." },
      { sig: "public CounterMemento save()", desc: "creates state snapshot memento." },
      { sig: "public void restore(CounterMemento memento)", desc: "restores previous count from memento." }
    ]
  },
  {
    num: 88,
    title: "Design a Music Library Iterator",
    slug: "design-music-library-iterator",
    category: "behavioral-patterns",
    topics: ["Iterator"],
    difficulty: "Medium",
    narrative: "Implement multiple iterators on MusicLibrary: SequentialIterator, ShuffleIterator, and GenreFilterIterator.",
    className: "MusicLibrary",
    constructorSig: "public MusicLibrary()",
    methods: [
      { sig: "public java.util.Iterator<Song> getShuffleIterator()", desc: "returns random-order non-repeating iterator." }
    ]
  },
  {
    num: 89,
    title: "Design Stock Price Alerts",
    slug: "design-stock-alerts",
    category: "behavioral-patterns",
    topics: ["Observer"],
    difficulty: "Medium",
    narrative: "Implement StockMarket Subject notifying PriceAlertObserver clients whenever a stock crosses a threshold price.",
    className: "StockMarket",
    constructorSig: "public StockMarket()",
    methods: [
      { sig: "public void setPrice(String symbol, double newPrice)", desc: "updates stock price and fires observers." }
    ]
  },
  {
    num: 90,
    title: "Design a Weather Station",
    slug: "design-weather-station",
    category: "behavioral-patterns",
    topics: ["Observer"],
    difficulty: "Medium",
    narrative: "Implement WeatherData subject updating CurrentConditionsDisplay, StatisticsDisplay, and ForecastDisplay observers upon weather measurements.",
    className: "WeatherData",
    constructorSig: "public WeatherData()",
    methods: [
      { sig: "public void setMeasurements(double temp, double humidity, double pressure)", desc: "notifies all display observers." }
    ]
  },
  {
    num: 91,
    title: "Design a Text Editor",
    slug: "design-text-editor",
    category: "behavioral-patterns",
    topics: ["Command"],
    difficulty: "Medium",
    narrative: "Implement Command pattern with InsertTextCommand, DeleteTextCommand, and UndoCommand maintaining an undo/redo stack.",
    className: "TextEditorInvoker",
    constructorSig: "public TextEditorInvoker()",
    methods: [
      { sig: "public void executeCommand(Command cmd)", desc: "runs command and pushes to undo stack." },
      { sig: "public void undo()", desc: "un-executes last command." }
    ]
  },
  {
    num: 92,
    title: "Design a Database Transaction",
    slug: "design-database-transaction",
    category: "behavioral-patterns",
    topics: ["Command"],
    difficulty: "Medium",
    narrative: "Design a TransactionManager executing InsertRowCommand, UpdateRowCommand with atomic rollback() on failure.",
    className: "TransactionManager",
    constructorSig: "public TransactionManager()",
    methods: [
      { sig: "public void addCommand(DatabaseCommand cmd)", desc: "queues command." },
      { sig: "public boolean commit()", desc: "executes all or rolls back on failure." }
    ]
  },
  {
    num: 93,
    title: "Design an ATM Machine",
    slug: "design-atm-machine",
    category: "behavioral-patterns",
    topics: ["State"],
    difficulty: "Medium",
    narrative: "Implement ATM state transitions: NoCardState -> HasCardState -> CorrectPinState -> DispensingCashState.",
    className: "ATMMachine",
    constructorSig: "public ATMMachine(int initialCash)",
    methods: [
      { sig: "public boolean insertCard()", desc: "transitions to HasCard state." },
      { sig: "public boolean enterPin(int pin)", desc: "validates PIN." },
      { sig: "public boolean withdraw(int amount)", desc: "dispenses cash if state allows." }
    ]
  },
  {
    num: 94,
    title: "Design an Order Processor State",
    slug: "design-order-processor-state",
    category: "behavioral-patterns",
    topics: ["State"],
    difficulty: "Medium",
    narrative: "Implement State pattern modeling NewOrderState, PaidOrderState, ShippedOrderState, and RefundedOrderState behaviors.",
    className: "OrderStateContext",
    constructorSig: "public OrderStateContext()",
    methods: [
      { sig: "public void processPayment()", desc: "delegates to active state." },
      { sig: "public void ship()", desc: "ships order if in Paid state." }
    ]
  },
  {
    num: 95,
    title: "Design a Build Pipeline",
    slug: "design-build-pipeline",
    category: "behavioral-patterns",
    topics: ["Template Method"],
    difficulty: "Medium",
    narrative: "Implement Template Method CI/CD pipeline (checkoutCode -> compile -> runUnitTests -> packageArtifact -> deploy) with JavaPipeline and NodePipeline subclasses.",
    className: "CIPipeline",
    constructorSig: "public CIPipeline()",
    methods: [
      { sig: "public boolean runPipeline()", desc: "executes build steps in fixed sequence." }
    ]
  },
  {
    num: 96,
    title: "Design a Document Parser Template",
    slug: "design-document-parser-template",
    category: "behavioral-patterns",
    topics: ["Template Method"],
    difficulty: "Medium",
    narrative: "Implement DataMiner template (openFile -> extractRawData -> parseData -> analyze -> closeFile) with PDFMiner and ExcelMiner.",
    className: "DataMiner",
    constructorSig: "public DataMiner()",
    methods: [
      { sig: "public Report mine(String path)", desc: "executes mining algorithm skeleton." }
    ]
  },
  {
    num: 97,
    title: "Design a Logging Framework",
    slug: "design-logging-framework",
    category: "behavioral-patterns",
    topics: ["Chain of Responsibility"],
    difficulty: "Medium",
    narrative: "Implement Chain of Responsibility with InfoLogger -> DebugLogger -> ErrorLogger handlers processing log records based on severity.",
    className: "LoggerChain",
    constructorSig: "public LoggerChain()",
    methods: [
      { sig: "public void logMessage(int level, String msg)", desc: "passes log message down handler chain." }
    ]
  },
  {
    num: 98,
    title: "Design an Expense Approval Chain",
    slug: "design-expense-approval-chain",
    category: "behavioral-patterns",
    topics: ["Chain of Responsibility"],
    difficulty: "Medium",
    narrative: "Implement approval hierarchy (TeamLead <= $1,000, Director <= $10,000, VP <= $50,000, Board > $50,000) using Chain of Responsibility.",
    className: "ExpenseApprovalChain",
    constructorSig: "public ExpenseApprovalChain()",
    methods: [
      { sig: "public String processExpense(double amount, String purpose)", desc: "routes expense to proper approving authority." }
    ]
  },
  {
    num: 99,
    title: "Design a Message Inbox Visitor",
    slug: "design-message-inbox-visitor",
    category: "behavioral-patterns",
    topics: ["Visitor"],
    difficulty: "Medium",
    narrative: "Implement Visitor pattern with MessageVisitor performing operations (WordCountVisitor, SpamFilterVisitor) across TextMessage and AudioMessage elements.",
    className: "MessageInbox",
    constructorSig: "public MessageInbox()",
    methods: [
      { sig: "public void accept(MessageVisitor visitor)", desc: "visits all elements in inbox." }
    ]
  },
  {
    num: 100,
    title: "Design a Chat Room",
    slug: "design-chat-room",
    category: "behavioral-patterns",
    topics: ["Mediator"],
    difficulty: "Medium",
    narrative: "Implement Mediator pattern where ChatRoomMediator coordinates message sending and private messaging between User instances without direct user coupling.",
    className: "ChatRoomMediator",
    constructorSig: "public ChatRoomMediator()",
    methods: [
      { sig: "public void sendMessage(String msg, User sender)", desc: "broadcasts message to all users except sender." },
      { sig: "public void sendPrivate(String msg, User sender, String receiverId)", desc: "delivers message to target user." }
    ]
  },
  {
    num: 101,
    title: "Design a Game Save System",
    slug: "design-game-save-system",
    category: "behavioral-patterns",
    topics: ["Memento"],
    difficulty: "Medium",
    narrative: "Implement Memento pattern on GameState saving checkpoint mementos to GameSaveCaretaker and restoring upon player defeat.",
    className: "GameStateOriginator",
    constructorSig: "public GameStateOriginator()",
    methods: [
      { sig: "public GameMemento saveCheckpoint()", desc: "creates game state memento." },
      { sig: "public void loadCheckpoint(GameMemento memento)", desc: "restores game state." }
    ]
  },
  {
    num: 102,
    title: "Design a Paginated Catalog",
    slug: "design-paginated-catalog",
    category: "behavioral-patterns",
    topics: ["Iterator"],
    difficulty: "Hard",
    narrative: "Implement a two-tier PaginatedIterator that transparently fetches next page chunks from a remote backend as the client calls next().",
    className: "PaginatedCatalogIterator",
    constructorSig: "public PaginatedCatalogIterator(RemoteBackendService backend)",
    methods: [
      { sig: "public boolean hasNext()", desc: "checks local page or pre-fetches next page." },
      { sig: "public Product next()", desc: "returns next product." }
    ]
  },
  {
    num: 103,
    title: "Design an Order Fulfillment Saga",
    slug: "design-order-fulfillment-saga",
    category: "behavioral-patterns",
    topics: ["Command"],
    difficulty: "Hard",
    narrative: "Implement Command pattern with compensating transactions (ReserveStockCommand -> ChargeCardCommand -> ShipPackageCommand) with automatic rollback on step failure.",
    className: "OrderFulfillmentSaga",
    constructorSig: "public OrderFulfillmentSaga()",
    methods: [
      { sig: "public boolean executeSaga(Order order)", desc: "executes commands with compensating rollbacks on failure." }
    ]
  },
  {
    num: 104,
    title: "Design a Support Ticket Router",
    slug: "design-support-ticket-router",
    category: "behavioral-patterns",
    topics: ["Chain of Responsibility"],
    difficulty: "Hard",
    narrative: "Implement dynamic Chain of Responsibility routing customer tickets based on skill tags, language, and SLA tier to Tier1, Tier2, and Specialist handlers.",
    className: "SupportTicketRouter",
    constructorSig: "public SupportTicketRouter()",
    methods: [
      { sig: "public String routeTicket(Ticket ticket)", desc: "passes ticket through matching handler chain." }
    ]
  },
  {
    num: 105,
    title: "Design a Document Visitor",
    slug: "design-document-visitor",
    category: "behavioral-patterns",
    topics: ["Visitor"],
    difficulty: "Hard",
    narrative: "Implement Visitor pattern traversing a Document object hierarchy (Paragraph, Table, Image, Header) with MarkdownExportVisitor and PlainTextVisitor.",
    className: "DocumentVisitorDemo",
    constructorSig: "public DocumentVisitorDemo()",
    methods: [
      { sig: "public String exportDocument(Document doc, DocumentVisitor visitor)", desc: "applies visitor across all document elements." }
    ]
  },
  {
    num: 106,
    title: "Design a Turn-Based Game Lobby",
    slug: "design-turn-based-game-lobby",
    category: "behavioral-patterns",
    topics: ["Mediator"],
    difficulty: "Hard",
    narrative: "Implement GameLobbyMediator coordinating matchmaking, turn rotation, and timeout clock events between Player participants in a turn-based board game.",
    className: "GameLobbyMediator",
    constructorSig: "public GameLobbyMediator()",
    methods: [
      { sig: "public void makeMove(Player player, Move move)", desc: "validates move, updates state, and advances turn." }
    ]
  },
  {
    num: 107,
    title: "Design a Document Version History",
    slug: "design-document-version-history",
    category: "behavioral-patterns",
    topics: ["Memento"],
    difficulty: "Hard",
    narrative: "Implement DocumentVersionCaretaker managing branching memento version histories, tag labels, and time-travel rollback.",
    className: "DocumentVersionCaretaker",
    constructorSig: "public DocumentVersionCaretaker()",
    methods: [
      { sig: "public void commitVersion(String tag, DocumentMemento memento)", desc: "saves labeled version memento." },
      { sig: "public DocumentMemento getVersion(String tag)", desc: "retrieves tagged version." }
    ]
  }
];

// Enrich and generate full 107 items
const fullProblems = ALL_107_RAW.map((raw) => {
  const catObj = CATEGORIES.find(c => c.id === raw.category) || CATEGORIES[0];
  const className = raw.className || "LldSolution";
  const constructorSig = raw.constructorSig || `public ${className}()`;
  const methods = raw.methods || [{ sig: "public Object execute()", desc: "executes LLD method." }];
  const rules = raw.rules || [
    "All method calls operate on the instantiated object instance.",
    "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
    "Do not print to stdout in production methods unless explicitly requested."
  ];

  const examples = raw.examples || [
    {
      input: `obj = new ${className}()\nobj.execute()`,
      output: `[result]`,
      explanation: `All object state transitions execute consistently.`
    }
  ];

  const constraints = raw.constraints || [
    "1 <= operations.length <= 100",
    "All inputs satisfy domain bounds.",
    "At most 100 calls in total are made across all methods."
  ];

  const hints = raw.hints || [
    "Define private member variables to encapsulate the object's internal state.",
    "Initialize state in the constructor without exposing mutable internals.",
    "Validate input parameters before modifying state to ensure strong invariants."
  ];

  const testCases = raw.testCases || [
    {
      name: "Case 1",
      calls: [
        { call: `new ${className}()`, returns: "null" },
        { call: "execute()", returns: "void" }
      ],
      input: `new ${className}()`,
      expectedOutput: `Success`
    }
  ];

  const starterJava = `// Implement class ${className}

class ${className} {
    ${constructorSig} {
        
    }

${methods.map(m => `    ${m.sig} {
        
    }`).join('\n\n')}
}

/**
 * Your ${className} object will be instantiated and called as such:
 * ${className} obj = new ${className}();
${methods.map((m, i) => ` * Object param_${i + 1} = obj.${m.sig.replace(/public\s+[^\s]+\s+/, '').replace(/\s*\{.*/, '')};`).join('\n')}
 */`;

  const starterPython = `class ${className}:

    def __init__(self):
        pass

${methods.map(m => {
    const fnName = m.sig.replace(/public\s+[^\s]+\s+/, '').replace(/\(.*?\)/, '').trim();
    return `    def ${fnName}(self, *args, **kwargs):\n        pass`;
}).join('\n\n')}

# Your ${className} object will be instantiated and called as such:
# obj = ${className}()
`;

  const starterJs = `class ${className} {
    constructor() {
        
    }

${methods.map(m => {
    const fnName = m.sig.replace(/public\s+[^\s]+\s+/, '').replace(/\(.*?\)/, '').trim();
    return `    ${fnName}(...args) {\n        \n    }`;
}).join('\n\n')}
}

/**
 * Your ${className} object will be instantiated and called as such:
 * const obj = new ${className}();
 */`;

  const rubric = raw.rubric || {
    passingScore: "7/10",
    fields: "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
    stateMutation: "Full marks when methods mutate internal state and return updated values.",
    structure: "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
  };

  const description = `${raw.narrative}

### Implement the \`${className}\` class:

- \`${constructorSig.replace('public ', '')}\` creates an initialized instance.
${methods.map(m => `- \`${m.sig.replace('public ', '')}\` ${m.desc}`).join('\n')}

${rules.map(r => `- ${r}`).join('\n')}

#### Example 1:
\`\`\`
Input:
${examples[0] ? examples[0].input : 'default'}

Output:
${examples[0] ? examples[0].output : 'default'}

Explanation: ${examples[0] ? examples[0].explanation : 'Initial state execution.'}
\`\`\`

${examples[1] ? `#### Example 2:
\`\`\`
Input:
${examples[1].input}

Output:
${examples[1].output}

Explanation: ${examples[1].explanation}
\`\`\`
` : ''}

### Constraints
${constraints.map(c => `- ${c}`).join('\n')}

### How the design is graded (needs ${rubric.passingScore} to pass)
- **Fields and constructor**: ${rubric.fields}
- **Methods change the object's own state**: ${rubric.stateMutation}
- **Structure and naming**: ${rubric.structure}
`;

  return {
    id: raw.slug,
    number: raw.num,
    title: raw.title,
    category: raw.category,
    categoryTitle: catObj.title,
    difficulty: raw.difficulty,
    topics: raw.topics,
    narrative: raw.narrative,
    className: className,
    constructorSig: constructorSig,
    methods: methods,
    rules: rules,
    examples: examples,
    constraints: constraints,
    hints: hints,
    testCases: testCases,
    description: description,
    rubric: rubric,
    starterCode: {
      java: starterJava,
      python: starterPython,
      javascript: starterJs
    },
    editorial: `### Low-Level Design Analysis: ${raw.title}\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components.`
  };
});

// All unique topic tags for filtering
const allTopics = Array.from(new Set(fullProblems.flatMap(p => p.topics))).sort();

const fileContent = `// ============================================================================
// 107 Low-Level Design (LLD) Implementation & Practice Scenarios
// Complete interview and real-world low-level design dataset
// ============================================================================

export const LLD_CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

export const LLD_PROBLEMS = ${JSON.stringify(fullProblems, null, 2)};

export const LLD_TOPICS_LIST = ${JSON.stringify(allTopics, null, 2)};
`;

const outputPath = path.resolve(__dirname, 'frontend/src/data/lldPracticeData.js');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully generated 107 LLD problems in ${outputPath}`);
