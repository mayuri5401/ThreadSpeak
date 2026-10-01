import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Mail, User, Shield, Sparkles, ArrowRight, 
  Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, 
  Coffee, Leaf, Layers, Cpu, Server, Github, Globe, Star, Trophy
} from 'lucide-react';
import { login, register, demoLogin } from '../../shared/services/authService';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = 'login', // 'login' | 'register'
  onSuccess 
}) {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Core Java Developer');
  const [experienceLevel, setExperienceLevel] = useState('1-3 Years');
  const [rememberMe, setRememberMe] = useState(true);

  // Sync mode with prop on open
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage('');
      setSuccessMessage('');
    }
  }, [isOpen, initialMode]);

  // Handle ESC key dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Password strength helper
  const getPasswordStrength = () => {
    if (!password) return { level: 0, text: '', color: '' };
    if (password.length < 6) return { level: 1, text: 'Too short (min 6 chars)', color: 'bg-rose-500 text-rose-400' };
    if (password.length < 9) return { level: 2, text: 'Moderate Strength', color: 'bg-amber-500 text-amber-400' };
    return { level: 3, text: 'Strong & Secure', color: 'bg-emerald-500 text-emerald-400' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const res = await login({ email, password, rememberMe });
        setSuccessMessage(`Welcome back, ${res.user.name}!`);
        setTimeout(() => {
          setIsLoading(false);
          onSuccess?.(res.user);
          onClose();
        }, 600);
      } else {
        const res = await register({
          name,
          email,
          password,
          role,
          experienceLevel
        });
        setSuccessMessage(`Account created successfully! Welcome, ${res.user.name}!`);
        setTimeout(() => {
          setIsLoading(false);
          onSuccess?.(res.user);
          onClose();
        }, 600);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const handleDemoSignIn = async (accountType) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await demoLogin(accountType);
      setSuccessMessage(`Signed in as ${res.user.name} (${res.user.role})!`);
      setTimeout(() => {
        setIsLoading(false);
        onSuccess?.(res.user);
        onClose();
      }, 500);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Demo login failed.');
    }
  };

  const handleSocialSimulatedLogin = (provider) => {
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(async () => {
      try {
        const res = await demoLogin(provider === 'github' ? 'architect' : 'java-dev');
        setSuccessMessage(`Successfully connected via ${provider === 'github' ? 'GitHub' : 'Google'}!`);
        setTimeout(() => {
          setIsLoading(false);
          onSuccess?.(res.user);
          onClose();
        }, 500);
      } catch (err) {
        setIsLoading(false);
        setErrorMessage('Social auth simulation failed.');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-3xl bg-[#090F1E] border border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Glow Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="relative p-6 sm:p-7 pb-4 border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 shadow-md">
                <Shield className="w-5 h-5" />
              </span>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-400 uppercase">
                  ThreadSpeak Account
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {mode === 'login' ? 'Sign In to Your Account' : 'Create Free Student Account'}
                </h2>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {mode === 'login' 
                ? 'Sync your learning progress, completed DSA codes, and certificates.' 
                : 'Join 540+ lessons, 525+ DSA patterns, and cloud sandboxes.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/60 transition cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher (Sign In vs Register) */}
        <div className="px-6 sm:px-7 pt-4">
          <div className="flex rounded-2xl bg-slate-900/90 p-1 border border-slate-800">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 sm:p-7 pt-4 overflow-y-auto space-y-4">
          
          {/* Error Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-600/50 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-600/50 text-emerald-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Main Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Registration Extra Fields */}
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Mayuri Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 focus:outline-none text-white text-xs font-medium placeholder:text-slate-500 transition"
                    />
                  </div>
                </div>

                {/* Target Role & Engineering Track */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Target Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 focus:outline-none text-white text-xs font-bold transition"
                    >
                      <option value="Core Java Developer">Core Java Developer</option>
                      <option value="Spring Boot Engineer">Spring Boot Engineer</option>
                      <option value="System Architect (HLD)">System Architect (HLD)</option>
                      <option value="Low-Level Designer (LLD)">Low-Level Designer (LLD)</option>
                      <option value="Full-Stack Engineer">Full-Stack Engineer</option>
                      <option value="Student / Fresher">Student / Fresher</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Experience Level
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 focus:outline-none text-white text-xs font-bold transition"
                    >
                      <option value="Student / Fresher">Student / Fresher</option>
                      <option value="1-3 Years">1-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5+ Years">5+ Years (Senior/Staff)</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Work or Personal Email <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 focus:outline-none text-white text-xs font-medium placeholder:text-slate-500 transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  Password <span className="text-rose-400">*</span>
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('For password reset, please use any of our 1-Click Demo Profiles or create a new account.')}
                    className="text-[11px] text-emerald-400 hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 focus:outline-none text-white text-xs font-medium placeholder:text-slate-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator for Registration */}
              {mode === 'register' && password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-1.5 h-1.5 rounded-full overflow-hidden bg-slate-800">
                    <div className={`h-full transition-all duration-300 ${strength.level >= 1 ? 'w-1/3 bg-rose-500' : 'w-0'}`} />
                    <div className={`h-full transition-all duration-300 ${strength.level >= 2 ? 'w-1/3 bg-amber-500' : 'w-0'}`} />
                    <div className={`h-full transition-all duration-300 ${strength.level >= 3 ? 'w-1/3 bg-emerald-500' : 'w-0'}`} />
                  </div>
                  <span className={`text-[10px] font-mono font-bold block ${strength.color.split(' ')[1]}`}>
                    {strength.text}
                  </span>
                </div>
              )}
            </div>

            {/* Remember Me Checkbox */}
            {mode === 'login' && (
              <label className="flex items-center gap-2 cursor-pointer pt-0.5">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <span className="text-xs text-slate-400">Remember this device for 30 days</span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition duration-200 active:scale-98 disabled:opacity-50 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Sign In to Dashboard' : 'Create Free Account & Start Learning'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[10px] font-mono uppercase">
              <span className="bg-[#090F1E] px-3 text-slate-500 font-bold">
                Or Continue With
              </span>
            </div>
          </div>

          {/* Social Buttons (GitHub & Google) */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleSocialSimulatedLogin('github')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              <Github className="w-4 h-4 text-white" />
              <span>GitHub</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialSimulatedLogin('google')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Google</span>
            </button>
          </div>

          {/* 1-Click Quick Demo Sign-In Bar */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                1-Click Quick Demo Accounts
              </span>
              <span className="text-[9px] font-mono text-slate-500">Zero Typing</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleDemoSignIn('java-dev')}
                className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-left transition cursor-pointer group"
              >
                <div className="flex items-center gap-1">
                  <Coffee className="w-3 h-3 text-amber-400" />
                  <span className="text-[11px] font-bold text-white group-hover:text-amber-300">Mayuri</span>
                </div>
                <span className="text-[9px] text-slate-400 block truncate">Java Architect</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSignIn('architect')}
                className="p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-left transition cursor-pointer group"
              >
                <div className="flex items-center gap-1">
                  <Server className="w-3 h-3 text-indigo-400" />
                  <span className="text-[11px] font-bold text-white group-hover:text-indigo-300">Alex</span>
                </div>
                <span className="text-[9px] text-slate-400 block truncate">Systems Lead</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSignIn('student')}
                className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-left transition cursor-pointer group"
              >
                <div className="flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-emerald-400" />
                  <span className="text-[11px] font-bold text-white group-hover:text-emerald-300">Rohan</span>
                </div>
                <span className="text-[9px] text-slate-400 block truncate">DSA Student</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500">
            By continuing, you agree to ThreadSpeak's Terms of Engineering Learning &amp; Privacy Policy.
          </p>
        </div>

      </div>
    </div>
  );
}
