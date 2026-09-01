import React, { useState, useEffect } from 'react';
import { Play, Pause, ChevronRight, ChevronLeft, RotateCcw, Server, Shield, Send, Database, FileCode, CheckCircle2, Cpu } from 'lucide-react';

export default function SpringRequestFlowVisualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      id: 'client',
      name: 'Client Browser / Mobile App',
      icon: Send,
      badge: 'HTTP Ingress',
      color: 'border-cyan-500 text-cyan-700 dark:text-cyan-400 bg-cyan-50/80 dark:bg-cyan-950/40',
      action: 'Client dispatches HTTP POST /api/v1/orders',
      details: 'Payload: { "productId": "PROD-101", "quantity": 2, "paymentMethod": "CREDIT_CARD" } with Authorization: Bearer eyJhbGciOi...',
      takeaway: 'Standard JSON REST request initiating network socket transfer to Embedded Tomcat Server (Port 8080).'
    },
    {
      id: 'filters',
      name: 'Servlet Filter Chain (Tomcat)',
      icon: Shield,
      badge: 'Perimeter Security',
      color: 'border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40',
      action: 'CorsFilter, JwtAuthenticationFilter, OncePerRequestFilter',
      details: 'Validates CORS headers -> Decodes JWT signature -> Validates expiration -> Sets SecurityContextHolder.getContext().setAuthentication(auth).',
      takeaway: 'Filters run before Spring MVC DispatcherServlet is reached at the raw Servlet container level.'
    },
    {
      id: 'dispatcher',
      name: 'DispatcherServlet (Front Controller)',
      icon: Server,
      badge: 'Core Router',
      color: 'border-purple-500 text-purple-700 dark:text-purple-400 bg-purple-50/80 dark:bg-purple-950/40',
      action: 'Central Gateway delegates to HandlerMapping',
      details: 'DispatcherServlet receives HttpServletRequest, queries RequestMappingHandlerMapping to resolve the matching controller method.',
      takeaway: 'Implements the GoF Front Controller pattern: one single entry point orchestrating all HTTP web traffic.'
    },
    {
      id: 'interceptor',
      name: 'HandlerInterceptor (preHandle)',
      icon: Shield,
      badge: 'Method Guard',
      color: 'border-amber-500 text-amber-800 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-950/40',
      action: 'preHandle() evaluates permissions and rate limits',
      details: 'AuditInterceptor logs request start time, RateLimitInterceptor checks user quota. If true, continues down chain; if false, aborts.',
      takeaway: 'Interceptors are Spring-managed beans with direct access to target Method and ModelAndView.'
    },
    {
      id: 'controller',
      name: '@RestController (OrderController)',
      icon: FileCode,
      badge: 'Handler & DTO Binding',
      color: 'border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40',
      action: 'Jackson2HttpMessageConverter deserializes JSON to DTO',
      details: '@Valid triggers Bean Validation -> createOrder(@RequestBody CreateOrderRequest req) executes and calls orderService.placeOrder(req).',
      takeaway: 'Controllers handle HTTP mechanics (status codes, headers, parameter validation) and delegate logic to Services.'
    },
    {
      id: 'service',
      name: '@Service Layer (OrderService)',
      icon: Cpu,
      badge: 'Business Domain & @Transactional',
      color: 'border-rose-500 text-rose-700 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/40',
      action: 'AOP Proxy starts DB Transaction (@Transactional)',
      details: 'Validates inventory balance -> Calculates dynamic surge pricing -> Calls orderRepository.save(newOrder).',
      takeaway: 'Spring creates a CGLIB/JDK Dynamic Proxy wrapping OrderService to automatically manage JDBC transactions and rollbacks.'
    },
    {
      id: 'jpa',
      name: 'Spring Data JPA & EntityManager (Hibernate)',
      icon: Database,
      badge: 'Persistence Context',
      color: 'border-teal-500 text-teal-700 dark:text-teal-400 bg-teal-50/80 dark:bg-teal-950/40',
      action: 'First-Level Cache & Dirty Checking',
      details: 'Stores Order entity in L1 cache -> Generates INSERT INTO orders (id, product_id, qty, status) VALUES (?, ?, ?, ?) -> Flushes to DB.',
      takeaway: 'Persistence context ensures single instance identity per transaction and batches database writes.'
    },
    {
      id: 'response',
      name: 'Response Serializer & HTTP 201 Created',
      icon: CheckCircle2,
      badge: 'Egress Delivery',
      color: 'border-emerald-500 text-emerald-800 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40',
      action: 'Jackson serializes OrderResponse to JSON payload',
      details: 'HandlerInterceptor.afterCompletion() computes total latency (14ms) -> Returns HTTP 201 Created { "orderId": "ORD-9021", "status": "CONFIRMED" }',
      takeaway: 'Complete round-trip completed with clean architectural layering.'
    }
  ];

  const nextStep = () => {
    setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  const prevStep = () => {
    setCurrentStep(prev => (prev > 0 ? prev - 1 : steps.length - 1));
  };

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const active = steps[currentStep];

  return (
    <div className="p-6 rounded-2xl border border-slate-200 dark:border-emerald-500/20 bg-white dark:bg-[#0B1222]/80 space-y-6 shadow-sm dark:shadow-xl">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Spring MVC Request Pipeline &amp; Lifecycle Animator</h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
              Interactive Architecture Flow
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Step through an HTTP Request navigating Tomcat Filters, DispatcherServlet, Interceptors, Controllers, Services, and JPA.
          </p>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevStep}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs transition ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {isPlaying ? 'Pause Auto-Play' : 'Auto Play Pipeline'}
          </button>
          <button
            onClick={nextStep}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition"
            title="Restart Flow"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Pipeline Node Sequence */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center justify-between min-w-[760px] gap-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = idx === currentStep;
            const isPassed = idx < currentStep;

            return (
              <div key={s.id} className="flex items-center flex-1">
                <button
                  onClick={() => setCurrentStep(idx)}
                  className={`w-full p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-emerald-50 dark:bg-slate-900 border-emerald-500 shadow-md dark:shadow-lg dark:shadow-emerald-500/20 ring-1 ring-emerald-500'
                      : isPassed
                      ? 'bg-slate-50 dark:bg-slate-950/70 border-emerald-200 dark:border-emerald-900/60 opacity-90'
                      : 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isCurrent ? 'bg-emerald-500 text-slate-950' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate w-full">
                    Step {idx + 1}
                  </span>
                  <span className={`text-xs font-semibold truncate w-full ${isCurrent ? 'text-emerald-900 dark:text-white font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                    {s.badge}
                  </span>
                </button>
                {idx < steps.length - 1 && (
                  <div className={`w-3 h-0.5 mx-1 transition-colors ${idx < currentStep ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Phase Deep Dive Card */}
      <div className={`p-5 rounded-2xl border ${active.color} space-y-4 shadow-md dark:shadow-xl transition-all`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white shadow-sm">
              {React.createElement(active.icon, { className: "w-5 h-5" })}
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Phase {currentStep + 1} of {steps.length}: {active.badge}
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">{active.name}</h4>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-300 font-semibold shadow-sm">
            Active Processing Node
          </span>
        </div>

        {/* Action Description */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#080D18] border border-slate-200 dark:border-slate-800 space-y-1 shadow-inner">
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">Internal Operation:</span>
          <p className="text-sm font-mono text-cyan-700 dark:text-cyan-300 font-semibold">{active.action}</p>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-mono mt-1">{active.details}</p>
        </div>

        {/* Architectural Insight Takeaway */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-900 dark:text-white">Architectural Takeaway:</strong> {active.takeaway}
          </div>
        </div>
      </div>
    </div>
  );
}
