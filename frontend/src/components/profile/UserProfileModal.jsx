import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Camera, CheckCircle2, Sparkles, 
  Upload, Trash2, Award, BookOpen, Star, Zap,
  Check, Loader2, ShieldCheck, User
} from 'lucide-react';
import { 
  getUserProfile, 
  saveUserProfile, 
  processAndCompressImage, 
  CURATED_AVATARS 
} from '../../shared/services/avatarService';

export default function UserProfileModal({ 
  isOpen, 
  onClose, 
  completedCount = 0, 
  totalCount = 540, 
  starredCount = 0,
  onProfileUpdated
}) {
  const [profile, setProfile] = useState(getUserProfile());
  const [userNameInput, setUserNameInput] = useState(profile.userName);
  const [userRoleInput, setUserRoleInput] = useState(profile.role);
  const [isUploading, setIsUploading] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const p = getUserProfile();
      setProfile(p);
      setUserNameInput(p.userName);
      setUserRoleInput(p.role);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showToast = (msg) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleAvatarFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const compressedDataUrl = await processAndCompressImage(file, 256);
      const updated = saveUserProfile({ avatarUrl: compressedDataUrl });
      setProfile(updated);
      onProfileUpdated?.(updated);
      showToast('Custom photo saved & compressed!');
    } catch (err) {
      console.error('Avatar process error:', err);
      showToast(err.message || 'Failed to process image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelectCuratedAvatar = (avatar) => {
    const updated = saveUserProfile({ avatarUrl: avatar.url });
    setProfile(updated);
    onProfileUpdated?.(updated);
    showToast(`${avatar.label} avatar selected!`);
  };

  const handleSaveProfileInfo = (e) => {
    e.preventDefault();
    const updated = saveUserProfile({
      userName: userNameInput,
      role: userRoleInput
    });
    setProfile(updated);
    onProfileUpdated?.(updated);
    showToast('Profile details updated!');
  };

  const handleRemoveAvatar = () => {
    const defaultAvatar = CURATED_AVATARS[0].url;
    const updated = saveUserProfile({ avatarUrl: defaultAvatar });
    setProfile(updated);
    onProfileUpdated?.(updated);
    showToast('Avatar reset to default');
  };

  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const learningXp = completedCount * 50 + starredCount * 10;

  const modalMarkup = (
    <div className="fixed inset-0 z-[9999] overflow-y-auto flex items-center justify-center p-3 sm:p-6 min-h-screen">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg my-auto bg-white dark:bg-[#0B101D] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 dark:from-emerald-950/30 dark:via-cyan-950/20 dark:to-indigo-950/30">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Developer Profile &amp; Avatar Studio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Customize your developer persona &amp; track academy progress
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Active Avatar Card */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-slate-50 dark:bg-[#070D18] border border-slate-200 dark:border-slate-800/90 shadow-sm">
            
            {/* Avatar with Camera Overlay */}
            <div 
              className="relative group cursor-pointer shrink-0" 
              onClick={() => fileInputRef.current?.click()}
              title="Click to upload custom photo"
            >
              <div className="w-20 h-20 rounded-full ring-4 ring-emerald-500/30 overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span>{profile.userName.charAt(0).toUpperCase() || 'M'}</span>
                )}
              </div>

              {/* Camera Upload Overlay */}
              <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-semibold gap-0.5">
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Camera className="w-5 h-5" />
                    <span>Change</span>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFileSelect}
                className="hidden"
              />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {profile.userName}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono font-bold">
                  {profile.role}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400">
                Saved to your browser storage • 0ms instant loading
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? 'Compressing...' : 'Upload Photo'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-300 dark:border-slate-700 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Toast */}
          {feedbackToast && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{feedbackToast}</span>
            </div>
          )}

          {/* 1-Click Curated Engineering Personas */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Choose a Developer Persona (1-Click)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                HD Vector Avatars
              </span>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {CURATED_AVATARS.map((item) => {
                const isSelected = profile.avatarUrl === item.url;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectCuratedAvatar(item)}
                    className={`group relative p-1.5 rounded-2xl border transition-all duration-200 text-center flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/40 shadow-md scale-105'
                        : 'border-slate-200 dark:border-slate-800 hover:border-emerald-400 bg-white dark:bg-slate-900/60'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative">
                      <img 
                        src={item.url} 
                        alt={item.label} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-emerald-500/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white drop-shadow-md" />
                        </div>
                      )}
                    </div>
                    <span className="text-[9.5px] font-medium text-slate-700 dark:text-slate-300 truncate w-full">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Learning Academy Progress Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block uppercase">Completed</span>
              <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                {completedCount}
              </div>
              <span className="text-[10px] text-slate-400">/{totalCount} Topics</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block uppercase">Learning XP</span>
              <div className="text-xl font-extrabold text-amber-500 font-mono">
                {learningXp}
              </div>
              <span className="text-[10px] text-slate-400">Total Points</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block uppercase">Mastery</span>
              <div className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
                {completionPercent}%
              </div>
              <span className="text-[10px] text-slate-400">Curriculum</span>
            </div>
          </div>

          {/* Edit Name & Role */}
          <form onSubmit={handleSaveProfileInfo} className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block">Display Name</label>
                <input
                  type="text"
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-600 dark:text-slate-400 block">Title / Role</label>
                <input
                  type="text"
                  value={userRoleInput}
                  onChange={(e) => setUserRoleInput(e.target.value)}
                  placeholder="e.g. Backend Engineer"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-sm"
              >
                Save Profile
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalMarkup, document.body) : null;
}
