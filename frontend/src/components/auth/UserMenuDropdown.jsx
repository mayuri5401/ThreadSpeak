import React, { useRef, useEffect } from 'react';
import { 
  User, LogOut, Sparkles, Terminal, 
  BarChart3, ShieldCheck, Flame, ChevronRight,
  Crown, Award, Video
} from 'lucide-react';
import { logout } from '../../shared/services/authService';

export default function UserMenuDropdown({ 
  user, 
  isOpen, 
  onClose, 
  onSelectView, 
  onOpenPricing,
  onOpenCertificate,
  onLogout 
}) {
  const dropdownRef = useRef(null);

  // Auto-dismiss on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const handleAction = (viewName) => {
    onSelectView?.(viewName);
    onClose();
  };

  const handleSignOut = () => {
    logout();
    onLogout?.();
    onClose();
  };

  const isPro = user.isPro || user.role?.includes('PRO');

  return (
    <div 
      ref={dropdownRef}
      className="absolute right-0 top-full mt-3 w-76 rounded-2xl bg-[#090e1a]/95 light:bg-white/98 backdrop-blur-2xl border border-white/10 light:border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset] light:shadow-[0_20px_45px_rgba(0,0,0,0.1)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      {/* User Header Profile Card */}
      <div className="p-3 rounded-xl bg-white/[0.03] light:bg-slate-50 border border-white/5 light:border-slate-100 mb-1.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 font-black text-sm shrink-0 shadow-sm">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{user.name?.charAt(0) || 'U'}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white light:text-slate-900 truncate flex items-center gap-1.5">
              <span>{user.name}</span>
              {isPro ? (
                <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              ) : (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              )}
            </h4>
            <p className="text-[11px] text-slate-400 light:text-slate-500 truncate">{user.email}</p>
          </div>
        </div>

        {/* Role & Level Badges */}
        <div className="flex items-center justify-between gap-1 pt-2 mt-2 border-t border-white/[0.06] light:border-slate-200/60 text-[10px] font-mono">
          <span className={`px-2 py-0.5 rounded-md border truncate max-w-[150px] font-bold ${
            isPro
              ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
              : 'bg-emerald-500/10 text-emerald-400 light:text-emerald-700 light:bg-emerald-50 border-emerald-500/20'
          }`}>
            {user.role || 'Java Developer'}
          </span>
          <span className="text-amber-400 light:text-amber-600 flex items-center gap-1 font-bold">
            <Flame className="w-3 h-3 fill-amber-400 light:fill-amber-500" />
            {user.xp || 1450} XP
          </span>
        </div>
      </div>

      {/* PRO Upgrade Callout Banner if not pro */}
      {!isPro && (
        <button
          onClick={() => {
            onOpenPricing?.();
            onClose();
          }}
          className="w-full mb-1.5 p-2 rounded-xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-cyan-500/20 border border-amber-500/30 hover:border-amber-400/60 flex items-center justify-between text-xs font-bold text-amber-300 transition cursor-pointer group"
        >
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Upgrade to PRO (Save 50%)</span>
          </div>
          <span className="text-xs group-hover:translate-x-0.5 transition-transform">→</span>
        </button>
      )}

      {/* Action Links */}
      <div className="space-y-0.5">
        <button
          onClick={() => handleAction('mock-interview')}
          className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-200 light:text-slate-700 hover:text-white light:hover:text-slate-900 hover:bg-white/[0.06] light:hover:bg-slate-100 flex items-center justify-between transition cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <Video className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>AI FAANG Mock Interview</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        </button>

        <button
          onClick={() => {
            onOpenCertificate?.();
            onClose();
          }}
          className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-200 light:text-slate-700 hover:text-white light:hover:text-slate-900 hover:bg-white/[0.06] light:hover:bg-slate-100 flex items-center justify-between transition cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span>My Verified Certificates</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        </button>

        <button
          onClick={() => handleAction('profile')}
          className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-200 light:text-slate-700 hover:text-white light:hover:text-slate-900 hover:bg-white/[0.06] light:hover:bg-slate-100 flex items-center justify-between transition cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>My Profile &amp; Bio</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        </button>

        <button
          onClick={() => handleAction('progress')}
          className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-200 light:text-slate-700 hover:text-white light:hover:text-slate-900 hover:bg-white/[0.06] light:hover:bg-slate-100 flex items-center justify-between transition cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Learning Dashboard</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        </button>

        <button
          onClick={() => handleAction('playground')}
          className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-200 light:text-slate-700 hover:text-white light:hover:text-slate-900 hover:bg-white/[0.06] light:hover:bg-slate-100 flex items-center justify-between transition cursor-pointer group"
        >
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Java Execution Sandbox</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        </button>
      </div>

      <div className="my-1.5 border-t border-white/[0.06] light:border-slate-100" />

      {/* Logout Action */}
      <button
        onClick={handleSignOut}
        className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 flex items-center gap-2.5 transition cursor-pointer"
      >
        <LogOut className="w-4 h-4 text-rose-400" />
        <span>Sign Out</span>
      </button>
    </div>
  );
}
