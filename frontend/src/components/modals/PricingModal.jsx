import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { 
  X, Check, Sparkles, Zap, ShieldCheck, Crown, 
  CreditCard, ArrowRight, Lock, HelpCircle, Star, 
  Flame, Award, Globe, MessageSquare, CheckCircle2
} from 'lucide-react';
import { mfeEventBus, MfeEvents } from '../../shared/events/MfeEventBus';
import { getCurrentUser } from '../../shared/services/authService';

export default function PricingModal({ isOpen, onClose, onSelectView }) {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'upi' | 'paypal'
  const [couponCode, setCouponCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const plans = [
    {
      id: 'free',
      name: 'Starter',
      badge: 'Free Forever',
      price: '$0',
      period: 'forever',
      desc: 'Essential foundations for beginner Java developers.',
      popular: false,
      features: [
        'Access to Core Java 21 LTS basics',
        'Beginner DSA roadmap (first 50 problems)',
        'Standard in-browser Java sandbox',
        'Community discussion boards',
        'Basic MCQ quizzes'
      ],
      cta: 'Current Plan',
      disabled: true
    },
    {
      id: 'pro-pass',
      name: 'ThreadSpeak PRO',
      badge: billingCycle === 'annual' ? 'Save 35% (Most Popular)' : 'Full Access',
      price: billingCycle === 'annual' ? '$12' : '$19',
      billedNote: billingCycle === 'annual' ? 'Billed annually ($144/yr)' : 'Billed monthly, cancel anytime',
      period: '/month',
      desc: 'Complete mastery for engineers preparing for Senior & FAANG roles.',
      popular: true,
      features: [
        'All 540+ Full Curriculum Chapters & Tracks',
        'Complete 525+ DSA Blind 75 & A-to-Z Roadmap',
        '150+ High-Level System Design Scenarios',
        '107 Low-Level Design (LLD) with AI Rubric Grading',
        '50 Java Concurrency & Virtual Threads Labs',
        'AI FAANG Mock Interview Simulator (Unlimited)',
        'Official Verifiable Certificates of Completion',
        'Downloadable PDF eBooks, Handbooks & Cheatsheets',
        'High-speed cloud code execution engine'
      ],
      cta: 'Upgrade to PRO',
      disabled: false
    },
    {
      id: 'lifetime',
      name: 'Lifetime Founder',
      badge: 'One-Time Payment',
      price: '$249',
      period: 'one-time',
      billedNote: 'Pay once, own all current & future tracks forever',
      desc: 'Ultimate career investment with direct instructor support.',
      popular: false,
      features: [
        'Everything in ThreadSpeak PRO for life',
        'All future tracks (Go, Rust, AI Systems) included',
        'VIP Discord private channel access',
        '2 Free 1-on-1 AI Resume & Portfolio Audits',
        'Exclusive Founder profile badge & gold theme',
        'Direct priority support from Staff Engineers'
      ],
      cta: 'Get Lifetime Access',
      disabled: false
    }
  ];

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'LAUNCH50' || couponCode.toUpperCase() === 'PRO50') {
      setDiscountPercent(50);
    } else {
      alert('Invalid coupon code. Try code "LAUNCH50" for 50% off!');
    }
  };

  const handleInitiateCheckout = (plan) => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
    setIsSuccess(false);
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Update User State to PRO via event bus
      const user = getCurrentUser() || { name: 'Engineer', email: 'user@threadspeak.dev' };
      const updatedUser = {
        ...user,
        role: selectedPlan?.id === 'lifetime' ? '👑 Founder PRO' : '⚡ PRO Member',
        isPro: true,
        proSince: new Date().toISOString()
      };
      
      try {
        localStorage.setItem('threadspeak_auth_user', JSON.stringify(updatedUser));
      } catch (err) {
        console.warn('Failed to save updated auth user', err);
      }
      
      mfeEventBus.emit(MfeEvents.AUTH_USER_UPDATED, { user: updatedUser });

      setTimeout(() => {
        setIsCheckoutOpen(false);
        onClose();
      }, 2500);
    }, 1500);
  };

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isCheckoutOpen) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#080D1A] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-200 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-32 bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-cyan-500/15 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="p-5 sm:p-7 border-b border-white/10 flex items-start justify-between shrink-0 relative z-10">
          <div className="space-y-1.5 min-w-0 pr-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-bold flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>THREADSPEAK PRO ACCESS</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-bold">
                14-Day Money-Back Guarantee
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Unlock Your Full Engineering Potential
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Ace your FAANG &amp; Staff-level technical interviews with live AI mock rounds, real distributed architecture blueprints, and verified credentials.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition cursor-pointer shrink-0"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Billing Switcher */}
        <div className="flex items-center justify-center py-4 bg-[#060a14] border-b border-white/5 shrink-0">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg transition cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-white/[0.1] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition cursor-pointer ${
                billingCycle === 'annual'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] uppercase font-black px-1.5 py-0.2 rounded bg-black/20 text-slate-900">Save 35%</span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-auto flex-1 custom-scrollbar relative z-10">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`p-5 sm:p-6 rounded-2xl flex flex-col justify-between transition-all duration-200 relative ${
                plan.popular
                  ? 'bg-gradient-to-b from-emerald-950/40 via-slate-900 to-[#070B14] border-2 border-emerald-500/60 shadow-2xl shadow-emerald-500/10'
                  : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white">{plan.name}</h3>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                      {plan.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-snug">{plan.desc}</p>
                </div>

                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-semibold">{plan.period}</span>
                  </div>
                  {plan.billedNote && (
                    <span className="text-[11px] text-emerald-400 font-medium block mt-1">{plan.billedNote}</span>
                  )}
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Features Included:
                  </span>
                  <ul className="space-y-2">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-4">
                {plan.disabled ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 text-xs font-bold cursor-not-allowed text-center"
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <button
                    onClick={() => handleInitiateCheckout(plan)}
                    className={`w-full py-2.5 rounded-xl text-xs font-black transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                      plan.popular
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-emerald-500/20 hover:scale-[1.02] active:scale-95'
                        : 'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{plan.cta}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer Guarantee Bar */}
        <div className="p-4 sm:p-5 bg-[#060a14] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2.5 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted 256-bit Stripe / Razorpay checkout • Instant access granted • Cancel anytime</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
            <span>Coupon code:</span>
            <span className="text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded font-bold">LAUNCH50</span>
          </div>
        </div>

      </div>

      {/* Checkout Modal Sub-Overlay */}
      {isCheckoutOpen && selectedPlan && (
        <div 
          className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => !isProcessing && setIsCheckoutOpen(false)}
        >
          <div 
            className="w-full max-w-md rounded-3xl bg-[#090F1E] border border-white/15 p-6 shadow-2xl space-y-5 text-slate-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {isSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-extrabold text-white">Payment Successful!</h3>
                <p className="text-xs text-slate-300">
                  Welcome to <span className="text-emerald-400 font-bold">ThreadSpeak PRO</span>. All 540+ chapters, AI mock interviews, and certificates are now unlocked!
                </p>
                <div className="pt-2 text-[11px] font-mono text-slate-400">
                  Redirecting to your dashboard...
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-400" />
                    <h4 className="text-base font-bold text-white">Checkout: {selectedPlan.name}</h4>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Plan Summary */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">{selectedPlan.name} ({billingCycle})</span>
                    <span className="text-[11px] text-slate-400">Instant Full Platform Access</span>
                  </div>
                  <div className="text-right">
                    {discountPercent > 0 ? (
                      <div>
                        <span className="text-xs text-slate-400 line-through mr-1.5">{selectedPlan.price}</span>
                        <span className="text-base font-extrabold text-emerald-400">
                          ${(parseFloat(selectedPlan.price.replace('$', '')) * (1 - discountPercent / 100)).toFixed(0)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-base font-extrabold text-white">{selectedPlan.price}</span>
                    )}
                  </div>
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. LAUNCH50)"
                    className="flex-1 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-bold text-white transition cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Payment Method</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'card', label: 'Credit Card', icon: CreditCard },
                      { id: 'upi', label: 'UPI / Razorpay', icon: Zap },
                      { id: 'paypal', label: 'PayPal', icon: Globe },
                    ].map((m) => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition cursor-pointer ${
                            paymentMethod === m.id
                              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300'
                              : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{m.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Simulated Card Fields */}
                {paymentMethod === 'card' && (
                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      placeholder="Card Number (4242 •••• •••• 4242)"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 font-mono focus:outline-none"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 font-mono focus:outline-none"
                      />
                      <input
                        type="password"
                        placeholder="CVC"
                        defaultValue="123"
                        className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-slate-500 font-mono focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Payment Action */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleProcessPayment}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs transition duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Complete Order ({discountPercent > 0 ? `${100 - discountPercent}% Total` : selectedPlan.price})</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
