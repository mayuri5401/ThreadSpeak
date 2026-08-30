---
id: "spring-core-ioc-di"
trackId: "spring-boot"
trackTitle: "Spring Boot & Microservices"
category: "Spring Core & IoC"
title: "Spring Inversion of Control (IoC) & Dependency Injection (DI)"
slug: "spring-core-ioc-di"
summary: "Master the Spring ApplicationContext container, Bean Lifecycle hooks, Bean scopes (Singleton, Prototype, Request, Session), Constructor vs Field Injection, and Component Scanning."
eli10: "Think of a restaurant kitchen. Without IoC, the chef (your class) has to leave the kitchen, drive to the farm, harvest tomatoes, and build a stove. With IoC, the Restaurant Manager (Spring Container) purchases the ingredients and delivers ready-to-use stove and tomatoes directly to the chef's counter via Constructor Injection!"
mentalModel: "ApplicationContext -> BeanDefinition Registry -> Instantiation (Reflection) -> Populate Properties (DI) -> BeanNameAware / BeanFactoryAware -> @PostConstruct / InitializingBean -> Ready for Service -> @PreDestroy / DisposableBean."
difficulty: "Intermediate"
estimatedMinutes: 14
tags: ["Spring Boot","IoC","Dependency Injection","ApplicationContext","Bean Lifecycle","AOP Proxy"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Spring constructor injection with final immutable dependencies."
  code: |
    @Service
    public class OrderService {
        // Recommended: Constructor Injection (Immutable & Testable)
        private final PaymentProcessor paymentProcessor;
        private final NotificationService notificationService;
    
        public OrderService(PaymentProcessor pp, NotificationService ns) {
            this.paymentProcessor = pp;
            this.notificationService = ns;
        }
    
        public void placeOrder(String orderId, double amount) {
            paymentProcessor.charge(orderId, amount);
            notificationService.notifyCustomer(orderId);
        }
    }
---

### 🌿 Spring ApplicationContext Lifecycle

1. **Bean Definition Loading**: Reads `@Configuration`, `@Component`, `@Service`, `@Repository`.
2. **BeanFactoryPostProcessor**: Modifies bean definitions before any instances are created (e.g. `PropertySourcesPlaceholderConfigurer`).
3. **Instantiation**: JVM creates instance via constructor reflection.
4. **Dependency Injection**: Spring injects dependent beans via constructor arguments.
5. **BeanPostProcessor (Before Init)**: Processes `@PostConstruct`, `@Value`.
6. **Initialization**: Invokes `InitializingBean.afterPropertiesSet()` or custom `@Bean(initMethod)`.
7. **BeanPostProcessor (After Init)**: Wraps bean in **AOP dynamic CGLIB / JDK Dynamic Proxies** (e.g. `@Transactional`, `@Async`).
8. **Ready to Serve**: Placed in Singleton Bean Cache (`DefaultSingletonBeanRegistry`).
9. **Destruction**: Executes `@PreDestroy` and `DisposableBean.destroy()` upon shutdown.