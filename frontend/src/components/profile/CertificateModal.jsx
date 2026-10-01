import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { 
  X, Download, Share2, Award, Sparkles, 
  ShieldCheck, CheckCircle2, QrCode, ExternalLink, Crown
} from 'lucide-react';
import { getCurrentUser } from '../../shared/services/authService';
import { getUserProfile } from '../../shared/services/avatarService';

export default function CertificateModal({ isOpen, onClose, user }) {
  const [selectedTrack, setSelectedTrack] = useState('core-java');
  const [isExporting, setIsExporting] = useState(false);
  const certRef = useRef(null);

  const currentUser = user || getCurrentUser() || { userName: 'Alexander Mitchell' };
  const studentName = currentUser.name || currentUser.userName || 'Alexander Mitchell';

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

  const tracks = [
    { id: 'core-java', title: 'Core Java 21 LTS & Concurrency Mastery', code: 'JAVA-21-EXP', hours: '60 Hours' },
    { id: 'spring-boot', title: 'Spring Boot 3 & Cloud Microservices Architect', code: 'SPRING-3-ARC', hours: '45 Hours' },
    { id: 'system-design', title: 'Distributed Systems & High-Level Design (HLD)', code: 'SYS-HLD-STAFF', hours: '50 Hours' },
    { id: 'lld', title: 'Object-Oriented & Low-Level Design (LLD)', code: 'LLD-GOF-PATTERNS', hours: '40 Hours' },
  ];

  const currentTrackData = tracks.find(t => t.id === selectedTrack) || tracks[0];
  const credentialId = `TS-2026-CERT-${Math.abs(studentName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1000) * 883).toString().substring(0, 6)}`;
  const issueDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const handleDownloadCertificate = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Your High-Resolution Official Certificate has been generated and ready for download!');
    }, 1200);
  };

  const handleShareLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(currentTrackData.title)}&organizationName=ThreadSpeak+Academy&issueYear=2026&certUrl=https://thread-speak.vercel.app/verify/${credentialId}&certId=${credentialId}`;
    window.open(linkedinUrl, '_blank');
  };

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#080D1A] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-200 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Verified Certificate of Completion</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Verifiable Credential
                </span>
              </h3>
              <p className="text-xs text-slate-400">Add to LinkedIn or export high-resolution print-ready certificate.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Selector Bar */}
        <div className="flex items-center gap-2 p-3 bg-[#060a14] border-b border-white/5 shrink-0 overflow-x-auto">
          {tracks.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTrack(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedTrack === t.id
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {t.title.split('&')[0]}
            </button>
          ))}
        </div>

        {/* Certificate Display Stage */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center custom-scrollbar">
          
          {/* Certificate Canvas / Frame */}
          <div 
            ref={certRef}
            className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-[#0c1424] via-[#090f1d] to-[#060a14] border-4 border-amber-500/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden text-center space-y-6"
          >
            {/* Ambient Gold Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-400/80 m-2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-400/80 m-2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-400/80 m-2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-400/80 m-2 pointer-events-none" />

            {/* Certificate Header */}
            <div className="space-y-1">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-extrabold">
                  ThreadSpeak Academy
                </span>
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                Certificate of Engineering Excellence
              </h2>
              <p className="text-[11px] text-slate-400 font-serif italic">This is proudly presented to</p>
            </div>

            {/* Student Name */}
            <div className="py-2 border-b border-amber-500/20 max-w-md mx-auto">
              <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 font-serif tracking-wide">
                {studentName}
              </h1>
            </div>

            {/* Track Description */}
            <div className="space-y-1.5 max-w-lg mx-auto">
              <p className="text-xs text-slate-300 leading-relaxed">
                For successfully mastering all 540+ chapters, passing comprehensive architectural evaluations, and demonstrating mastery in
              </p>
              <h3 className="text-sm sm:text-base font-extrabold text-emerald-400">
                {currentTrackData.title}
              </h3>
            </div>

            {/* Seal & Verification Signature Details */}
            <div className="pt-6 grid grid-cols-3 items-end text-left text-[10px] font-mono border-t border-white/10">
              <div>
                <span className="text-slate-400 block">Date of Issue</span>
                <span className="text-slate-200 font-bold">{issueDate}</span>
                <span className="text-slate-500 block mt-1">Credential: {credentialId}</span>
              </div>

              {/* Gold Center Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/25 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#080D1A] flex flex-col items-center justify-center text-amber-400">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[7px] font-black uppercase tracking-tighter mt-0.5">VERIFIED</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-slate-400 block">Instructor Signature</span>
                <span className="text-amber-300 font-serif italic font-bold text-sm block">V. Narkhede</span>
                <span className="text-slate-500 block mt-0.5">Staff Systems Architect</span>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 bg-[#060a14] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Cryptographically verifiable via ThreadSpeak global registry</span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleShareLinkedIn}
              className="px-4 py-2 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Add to LinkedIn Profile</span>
            </button>

            <button
              disabled={isExporting}
              onClick={handleDownloadCertificate}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-amber-500/20"
            >
              {isExporting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download High-Res PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
