/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Download,
  Check,
  Star,
  User,
  Shield,
  Zap,
  Volume2,
  EyeOff,
  Sliders,
  CheckCheck,
  Heart,
  Copy,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const APP_ICON = './assets/aistudio/skygram_icon_foregroun_d_d937c502.png';
const UPI_ID = 'rakshitdhakariya6@oksbi';
const DEVELOPER_NAME = 'Rakshit Dhakariya';

const handleIconError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = e.currentTarget;
  if (!target.dataset.triedPublic) {
    target.dataset.triedPublic = 'true';
    target.src = './public/assets/aistudio/skygram_icon_foregroun_d_d937c502.png';
  } else if (!target.dataset.triedRoot) {
    target.dataset.triedRoot = 'true';
    target.src = './mrtelegram_icon.jpg';
  }
};

export default function App() {
  // Master customizations toggle in Hero Card
  const [masterCustomOn, setMasterCustomOn] = useState(true);

  // Download simulation modal state
  const [isDlOpen, setIsDlOpen] = useState(false);
  const [dlProgress, setDlProgress] = useState(0);
  const [dlReady, setDlReady] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);

  // Support & Donate modal state
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [donateAmount, setDonateAmount] = useState<number>(100);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // About Me modal state
  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopiedUpi(true);
    showToast(`UPI ID copied: ${UPI_ID}`);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const triggerConfetti = () => {
    try {
      // Main celebratory blast
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#8b5cf6', '#f97316', '#59e0a8', '#38bdf8', '#ffd166'],
        zIndex: 99999,
      });

      // Side fireworks burst for extra delight
      setTimeout(() => {
        confetti({
          particleCount: 45,
          angle: 60,
          spread: 55,
          origin: { x: 0.2, y: 0.65 },
          colors: ['#ec4899', '#8b5cf6', '#f97316', '#59e0a8'],
          zIndex: 99999,
        });
        confetti({
          particleCount: 45,
          angle: 120,
          spread: 55,
          origin: { x: 0.8, y: 0.65 },
          colors: ['#ec4899', '#8b5cf6', '#f97316', '#59e0a8'],
          zIndex: 99999,
        });
      }, 200);
    } catch {
      // Canvas fallback
    }
  };

  const openDownloadModal = () => {
    setIsDlOpen(true);
    setDlProgress(0);
    setDlReady(false);
    setDownloadStarted(false);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 12) + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setDlProgress(100);
        setDlReady(true);
      } else {
        setDlProgress(p);
      }
    }, 110);
  };

  const saveApkFile = () => {
    const content = `MRTelegram Android Client APK V1.0\nPackage: org.telegram.mrtelegram\nBuild: arm64-v8a\nDeveloper: Rakshittips\nSHA256: 7f83b12c8a92e105d4508ecbb71e271a0670d8a1e2bf656096dfdb3a19`;
    const blob = new Blob([content], { type: 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MRTelegram-V1.0.apk';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Trigger celebratory confetti animation in the download modal
    setDownloadStarted(true);
    triggerConfetti();
    showToast('🎉 MRTelegram-V1.0.apk download triggered!');

    // Automatically close modal after user enjoys the confetti celebration
    setTimeout(() => {
      setIsDlOpen(false);
      setDownloadStarted(false);
    }, 2800);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="min-h-screen text-[#f3eefb] selection:bg-[#ec4899] selection:text-white relative font-['Plus_Jakarta_Sans',sans-serif]"
      style={{
        background: `
          radial-gradient(circle at 12% -5%, rgba(139,92,246,0.22), transparent 40%),
          radial-gradient(circle at 95% 10%, rgba(249,115,22,0.14), transparent 35%),
          radial-gradient(circle at 50% 100%, rgba(236,72,153,0.12), transparent 45%),
          #0a0612
        `,
      }}
    >
      <div className="max-w-[980px] mx-auto px-5 sm:px-6">
        
        {/* NAV */}
        <nav className="flex items-center justify-between py-6">
          <a href="#top" className="flex items-center gap-2.5 font-bold text-base font-['Syne',sans-serif]">
            <img
              src={APP_ICON}
              onError={handleIconError}
              alt="MRTelegram"
              className="w-9 h-9 rounded-full shadow-[0_4px_14px_rgba(30,77,239,0.5)] object-cover select-none transition-transform hover:scale-105 border border-blue-500/30"
            />
            <span className="tracking-tight text-lg">MRTelegram</span>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsDonateOpen(true)}
              className="text-[12px] sm:text-[12.5px] font-semibold bg-[#ec4899]/15 hover:bg-[#ec4899]/25 border border-[#ec4899]/30 hover:border-[#ec4899]/50 px-3.5 sm:px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer text-[#f592c0] transition-all shadow-sm active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 text-[#ec4899] fill-[#ec4899]" />
              <span>Support &amp; Donate</span>
            </button>
          </div>
        </nav>

        {/* HERO */}
        <div className="py-12 sm:py-14 pb-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          
          {/* Left Hero Copy */}
          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-1.5 text-[11.5px] font-extrabold text-[#f592c0] bg-[#ec4899]/10 border border-[#ec4899]/25 px-3.5 py-1.5 rounded-full mb-4.5">
              <Zap className="w-3 h-3 text-[#f97316]" /> MRTelegram · V1.0 Official
            </div>

            <h1 className="text-3xl sm:text-[42px] font-bold leading-[1.08] tracking-tight text-[#f3eefb] font-['Syne',sans-serif]">
              Telegram iPhone, restyled{' '}
              <em className="not-italic bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] bg-clip-text text-transparent">
                the way you want it.
              </em>
            </h1>

            <p className="mt-4 text-[15px] text-[#9a8fb3] max-w-[460px] leading-relaxed">
              An authentic iOS look for Telegram on Android, plus 30+ extra controls for your chat list, conversations, privacy and turbo downloads.
            </p>

            <div className="flex gap-7 mt-6.5">
              <div>
                <div className="font-bold text-xl text-white font-['Syne',sans-serif]">30+</div>
                <div className="text-[11px] text-[#5e5573] mt-0.5">extra settings</div>
              </div>
              <div>
                <div className="font-bold text-xl text-white font-['Syne',sans-serif]">68.4 MB</div>
                <div className="text-[11px] text-[#5e5573] mt-0.5">install size</div>
              </div>
              <div>
                <div className="font-bold text-xl text-white font-['Syne',sans-serif]">Android 8+</div>
                <div className="text-[11px] text-[#5e5573] mt-0.5">compatibility</div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-7.5 flex-wrap">
              <button
                onClick={openDownloadModal}
                className="bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] text-white font-bold text-sm px-6 sm:px-7 py-3.5 rounded-2xl inline-flex items-center gap-2 shadow-[0_14px_30px_-12px_rgba(236,72,153,0.55)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download APK
              </button>

              <button
                onClick={() => setIsDonateOpen(true)}
                className="bg-[#ec4899]/15 hover:bg-[#ec4899]/25 border border-[#ec4899]/30 text-[#f592c0] font-semibold text-[13px] px-5 py-3.5 rounded-2xl inline-flex items-center gap-2 transition-colors cursor-pointer active:scale-95"
              >
                <Heart className="w-4 h-4 fill-[#ec4899]" /> Support &amp; Donate
              </button>

              <a
                href="#features"
                className="border border-white/10 hover:bg-white/5 text-[#9a8fb3] hover:text-[#f3eefb] font-semibold text-[13px] px-5 py-3.5 rounded-2xl inline-flex items-center gap-1.5 transition-colors"
              >
                <Sliders className="w-4 h-4 text-[#b79bfb]" /> Explore Features
              </a>
            </div>
          </div>

          {/* Right Hero Card (Preferences Hub Preview) */}
          <div className="md:col-span-5">
            <div className="bg-[#130c20] border border-white/10 rounded-[26px] p-6.5 relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-radial from-[#8b5cf6]/20 to-transparent pointer-events-none"></div>

              <div className="flex items-center justify-between relative mb-1">
                <div className="flex items-center gap-3">
                  <img
                    src={APP_ICON}
                    onError={handleIconError}
                    alt="MRTelegram"
                    className="w-11 h-11 rounded-full shadow-[0_4px_16px_rgba(30,77,239,0.5)] object-cover select-none border border-blue-500/30"
                  />
                  <div>
                    <div className="font-bold text-[15px] text-white">MRTelegram</div>
                    <div className="text-[11px] text-[#5e5573]">
                      Custom settings hub
                    </div>
                  </div>
                </div>

                {/* Master switch */}
                <button
                  onClick={() => {
                    setMasterCustomOn(!masterCustomOn);
                    showToast(`Enable customizations: ${!masterCustomOn ? 'On' : 'Off'}`);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                    masterCustomOn
                      ? 'bg-[#59e0a8]/15 text-[#59e0a8] border border-[#59e0a8]/30'
                      : 'bg-white/5 text-[#9a8fb3] border border-white/10'
                  }`}
                >
                  {masterCustomOn ? 'Active' : 'Off'}
                </button>
              </div>

              <div className="mt-5 flex flex-col gap-2 relative text-xs text-[#9a8fb3]">
                {/* Row 1: General */}
                <div className="bg-[#1a1128] border border-white/8 rounded-[12px] px-3.5 py-2.5 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-sliders text-[#b79bfb] w-4 text-center"></i>
                    <span className="font-semibold text-white">General Settings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[#b79bfb] font-mono">iOS 18 Liquid</span>
                    <Check className="w-3.5 h-3.5 text-[#59e0a8]" />
                  </div>
                </div>

                {/* Row 2: Home */}
                <div className="bg-[#1a1128] border border-white/8 rounded-[12px] px-3.5 py-2.5 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-house text-[#ffab6b] w-4 text-center"></i>
                    <span className="font-semibold text-white">Home Screen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[#ffab6b] font-mono">2-Line mode</span>
                    <Check className="w-3.5 h-3.5 text-[#59e0a8]" />
                  </div>
                </div>

                {/* Row 3: Conversation */}
                <div className="bg-[#1a1128] border border-white/8 rounded-[12px] px-3.5 py-2.5 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-comments text-[#7cc0ff] w-4 text-center"></i>
                    <span className="font-semibold text-white">Conversation Screen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[#7cc0ff] font-mono">Cupertino bar</span>
                    <Check className="w-3.5 h-3.5 text-[#59e0a8]" />
                  </div>
                </div>

                {/* Row 4: Privacy */}
                <div className="bg-[#1a1128] border border-white/8 rounded-[12px] px-3.5 py-2.5 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-shield-halved text-[#ff7f9c] w-4 text-center"></i>
                    <span className="font-semibold text-white">Privacy &amp; Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[#59e0a8] font-mono">Anti-Delete ON</span>
                    <Check className="w-3.5 h-3.5 text-[#59e0a8]" />
                  </div>
                </div>

                {/* Row 5: Notifications */}
                <div className="bg-[#1a1128] border border-white/8 rounded-[12px] px-3.5 py-2.5 flex items-center justify-between transition-colors">
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-bell text-[#59e0a8] w-4 text-center"></i>
                    <span className="font-semibold text-white">Notification Preferences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[#59e0a8] font-mono">Unrestricted</span>
                    <Check className="w-3.5 h-3.5 text-[#59e0a8]" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* FEATURES (Feature Showcase Cards) */}
        <section id="features" className="py-13 border-t border-white/8">
          <div className="max-w-[560px] mb-8">
            <div className="text-[11.5px] font-bold text-[#5e5573] tracking-wider mb-2">FEATURES &amp; CAPABILITIES</div>
            <h2 className="text-2xl sm:text-[28px] font-bold leading-[1.15] text-white font-['Syne',sans-serif]">
              Everything the settings screens give you
            </h2>
            <p className="text-[13.5px] text-[#9a8fb3] mt-2.5">
              Comprehensive overview of customizations, privacy controls, and iOS UI enhancements built into MRTelegram.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {/* Card 1: iOS Interface Style */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#8b5cf6]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-blue-500/15 text-[#7cc0ff] flex items-center justify-center text-sm mb-4">
                <i className="fa-brands fa-apple text-base"></i>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">iOS interface style</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Switch between Telegram (default) and iOS fluid physics. Screens not yet adapted keep the official look.
              </p>
            </div>

            {/* Card 2: App font */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#8b5cf6]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-purple-500/15 text-[#b79bfb] flex items-center justify-center text-sm mb-4">
                <i className="fa-solid fa-font"></i>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">App font</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Pick iOS SF Pro Text, Samsung One UI 6, Linotte, Rubrik Sans, Expletus Sans or your system font.
              </p>
            </div>

            {/* Card 3: Faster downloads */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#59e0a8]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-emerald-500/15 text-[#59e0a8] flex items-center justify-center text-sm mb-4">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Faster downloads &amp; uploads</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Transfers files in parallel, with 16x turbo stream acceleration you choose.
              </p>
            </div>

            {/* Card 4: Home screen */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#ffab6b]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-amber-500/15 text-[#ffab6b] flex items-center justify-center text-sm mb-4">
                <i className="fa-solid fa-house"></i>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Home screen customizer</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Hide the All folder or search bar, customize folder style, and toggle 2 or 3 lines per chat row.
              </p>
            </div>

            {/* Card 5: Hide read checks in channels */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#f592c0]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-pink-500/15 text-[#f592c0] flex items-center justify-center text-sm mb-4">
                <CheckCheck className="w-4 h-4" />
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Hide read checks in channels</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Removes sent and read checkmarks in channels only. Chats and groups stay completely normal.
              </p>
            </div>

            {/* Card 6: Conversation screen */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#7cc0ff]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-blue-500/15 text-[#7cc0ff] flex items-center justify-center text-sm mb-4">
                <i className="fa-solid fa-comments"></i>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Conversation screen</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                iOS-style header, Cupertino input bar, search circle and context menu, plus instant translation.
              </p>
            </div>

            {/* Card 7: Stickers and bubbles */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#b79bfb]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-purple-500/15 text-[#b79bfb] flex items-center justify-center text-sm mb-4">
                <i className="fa-regular fa-face-smile"></i>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Stickers and bubbles</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Resize stickers with an interactive live slider and choose your custom bubble corner style.
              </p>
            </div>

            {/* Card 8: Voice messages */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#59e0a8]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-emerald-500/15 text-[#59e0a8] flex items-center justify-center text-sm mb-4">
                <Volume2 className="w-4 h-4" />
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Voice messages optimizer</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Reduces noise and echo with studio suppression and evens out volume while you record.
              </p>
            </div>

            {/* Card 9: View deleted messages */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#ff7f9c]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-red-500/15 text-[#ff7f9c] flex items-center justify-center text-sm mb-4">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">View deleted messages</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Keeps messages deleted after you received them and marks them as preserved on your phone.
              </p>
            </div>

            {/* Card 10: Hide phone number */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#ffab6b]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-amber-500/15 text-[#ffab6b] flex items-center justify-center text-sm mb-4">
                <EyeOff className="w-4 h-4" />
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Hide phone number</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Hides your number inside the MRTelegram interface while retaining account login credentials.
              </p>
            </div>

            {/* Card 11: Local Premium */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#f592c0]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-pink-500/15 text-[#f592c0] flex items-center justify-center text-sm mb-4">
                <Star className="w-4 h-4" />
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Local Premium unlock</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Treats your account as Premium inside the app, so interface premium badges and reactions work locally.
              </p>
            </div>

            {/* Card 12: Notification preferences */}
            <div className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#59e0a8]/40 rounded-[18px] p-5.5 transition-all hover:-translate-y-1">
              <div className="w-9.5 h-9.5 rounded-[11px] bg-emerald-500/15 text-[#59e0a8] flex items-center justify-center text-sm mb-4">
                <i className="fa-solid fa-bell"></i>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Notification diagnostics</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Permanent background push daemon status and custom fixes for Xiaomi, Samsung, and OnePlus.
              </p>
            </div>

          </div>
        </section>

        {/* DOWNLOAD PANEL */}
        <section id="download" className="py-13 border-t border-white/8">
          <div className="bg-gradient-to-br from-[#8b5cf6]/14 via-[#130c20] to-[#f97316]/8 border border-[#8b5cf6]/25 rounded-3xl p-7 sm:p-9 grid grid-cols-1 md:grid-cols-12 gap-7.5 items-center">
            
            <div className="md:col-span-7">
              <h2 className="text-2xl font-bold text-white mb-2.5 font-['Syne',sans-serif]">
                Ready to install
              </h2>
              <p className="text-[13px] text-[#9a8fb3] max-w-[420px] leading-relaxed">
                One clean APK package, installed like any standard Android app. Log in with your Telegram account securely.
              </p>

              <div className="flex gap-5.5 mt-5 flex-wrap">
                <div>
                  <div className="font-bold text-sm text-white">V1.0 (arm64-v8a)</div>
                  <div className="text-[10.5px] text-[#5e5573] mt-0.5">architecture</div>
                </div>
                <div>
                  <div className="font-bold text-sm text-white">68.4 MB</div>
                  <div className="text-[10.5px] text-[#5e5573] mt-0.5">file size</div>
                </div>
                <div>
                  <div className="font-bold text-sm text-white">Android 8.0+</div>
                  <div className="text-[10.5px] text-[#5e5573] mt-0.5">requires</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="bg-[#130c20] border border-white/10 rounded-[20px] p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4.5">
                  <img
                    src={APP_ICON}
                    onError={handleIconError}
                    alt="MRTelegram"
                    className="w-11 h-11 rounded-full object-cover shadow-md shadow-blue-500/30 border border-blue-500/30"
                  />
                  <div>
                    <div className="text-[13px] font-bold text-white">MRTelegram V1.0.apk</div>
                    <div className="text-[10.5px] text-[#5e5573] mt-0.5">68.4 MB · SHA256 verified</div>
                  </div>
                </div>

                <button
                  onClick={openDownloadModal}
                  className="w-full bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] text-white font-bold text-sm py-3.5 rounded-[13px] flex items-center justify-center gap-2 shadow-[0_14px_28px_-10px_rgba(236,72,153,0.5)] hover:brightness-110 active:scale-98 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download APK
                </button>

                <div className="text-[10.5px] text-[#5e5573] text-center mt-3 leading-relaxed">
                  For on-time notifications, allow background activity and set battery optimization to Unrestricted.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* RAKSHITTIPS SUPPORT & DONATE SECTION */}
        <section id="donate" className="py-13 border-t border-white/8">
          <div className="bg-gradient-to-br from-[#8b5cf6]/15 via-[#130c20] to-[#ec4899]/15 border border-[#ec4899]/30 rounded-3xl p-7 sm:p-9 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#ec4899]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#f592c0] bg-[#ec4899]/15 border border-[#ec4899]/30 px-3 py-1 rounded-full mb-3.5 shadow-xs">
                  <Heart className="w-3.5 h-3.5 text-[#ec4899] fill-[#ec4899]" /> Rakshittips Community Support
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-['Syne',sans-serif] tracking-tight">
                  Rakshittips Support &amp; Donate
                </h2>
                
                <p className="text-[13.5px] text-[#9a8fb3] mt-2.5 max-w-[480px] leading-relaxed">
                  MRTelegram is 100% free, privacy-first, and completely ad-free. If this iOS Telegram mod helps your daily messaging, you can support developer <strong>Rakshit Dhakariya</strong> directly via UPI.
                </p>

                {/* UPI ID Box */}
                <div className="mt-5 p-4 bg-[#1a1128] border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-[480px] shadow-lg">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#9a8fb3]">Verified Official UPI ID</div>
                    <div className="text-sm sm:text-base font-mono font-bold text-white select-all mt-0.5 text-[#59e0a8]">
                      {UPI_ID}
                    </div>
                  </div>

                  <button
                    onClick={handleCopyUpi}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] hover:brightness-110 active:scale-95 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#59e0a8]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy UPI ID</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Quick Action Buttons */}
                <div className="mt-4 flex flex-wrap items-center gap-2.5">
                  <a
                    href={`upi://pay?pa=${UPI_ID}&pn=Rakshit%20Dhakariya&cu=INR`}
                    className="inline-flex items-center gap-2 bg-[#59e0a8]/15 hover:bg-[#59e0a8]/25 text-[#59e0a8] border border-[#59e0a8]/30 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-xs"
                  >
                    <i className="fa-solid fa-mobile-screen-button"></i>
                    <span>Pay with Any UPI App</span>
                  </a>

                  <button
                    onClick={() => setIsDonateOpen(true)}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/15 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95"
                  >
                    <i className="fa-solid fa-qrcode text-[#ec4899]"></i>
                    <span>Scan QR Code &amp; Select Amount</span>
                  </button>
                </div>
              </div>

              {/* Right Side: QR Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="bg-[#160f24] border border-white/15 rounded-3xl p-5 shadow-2xl text-center max-w-[280px] w-full">
                  <div className="bg-white p-3 rounded-2xl inline-block shadow-inner mb-3">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi%3A%2F%2Fpay%3Fpa%3D${encodeURIComponent(UPI_ID)}%26pn%3DRakshit%2520Dhakariya%26cu%3DINR`}
                      alt={`UPI QR Code - ${UPI_ID}`}
                      className="w-36 h-36 object-contain rounded-lg mx-auto"
                      loading="lazy"
                    />
                  </div>

                  <div className="text-xs font-bold text-white font-['Syne',sans-serif]">Scan to Pay via UPI</div>
                  <div className="text-[11.5px] font-mono text-[#f592c0] mt-0.5 font-bold">{UPI_ID}</div>
                  <div className="text-[10px] text-[#5e5573] mt-1.5 flex items-center justify-center gap-1.5">
                    <span>GPay</span> · <span>PhonePe</span> · <span>Paytm</span> · <span>BHIM</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* DEVELOPER SECTION */}
        <section id="developer" className="py-13 border-t border-white/8">
          {/* RAKSHITTIPS BY DEVELOPER CARD */}
          <div className="bg-white text-gray-900 rounded-[28px] p-6 sm:p-7 shadow-2xl border border-white/20 text-left relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4.5 mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8b5cf6] via-[#ec4899] to-[#f97316] flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/25 shrink-0">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div>
                <h3 className="text-xl sm:text-[22px] font-bold text-[#111827] font-['Syne',sans-serif] tracking-tight">
                  Rakshittips by Developer
                </h3>
                <div className="inline-flex items-center gap-1.5 text-[11.5px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-300 px-3 py-0.5 rounded-full mt-1.5 mb-1 shadow-xs">
                  <span>✓ Rakshit Dhakariya</span>
                </div>
                <p className="text-[12.5px] text-gray-600 leading-relaxed font-medium">
                  Solo Developer • Android Mods, iOS Experience Ports &amp; Open Utilities
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-2 border-t border-gray-100">
              <button
                onClick={() => setIsAboutMeOpen(true)}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-xs font-semibold px-4 py-2.5 rounded-full transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <User className="w-3.5 h-3.5 text-[#ec4899]" />
                <span>About Me</span>
              </button>

              <button
                onClick={() => setIsDonateOpen(true)}
                className="inline-flex items-center gap-2 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-[#ec4899] text-xs font-bold px-4 py-2.5 rounded-full transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Heart className="w-3.5 h-3.5 fill-[#ec4899]" />
                <span>Support &amp; Donate</span>
              </button>

              <a
                href="https://youtube.com/@rakshittips"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-xs active:scale-95"
              >
                <i className="fa-brands fa-youtube text-[#ff0000] text-sm"></i>
                <span>YouTube</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-xs active:scale-95"
              >
                <i className="fa-brands fa-instagram text-[#e1306c] text-sm"></i>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-10 pb-20 border-t border-white/8">
          <div className="text-center text-[11.5px] text-[#9a8fb3] mb-2">
            Crafted with care by{' '}
            <strong className="font-bold bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] bg-clip-text text-transparent">
              Rakshittips!
            </strong>
          </div>

          <div className="text-center text-[10.5px] text-[#5e5573] leading-relaxed max-w-[440px] mx-auto">
            © 2026 Rakshittips. MRTelegram is an independent community project and is not affiliated with Telegram FZ-LLC.
          </div>
        </footer>

        {/* FLOATING TO-TOP BUTTON */}
        <button
          onClick={scrollToTop}
          className="fixed right-5 bottom-5 w-11 h-11 rounded-full bg-[#130c20] hover:bg-[#1a1128] border border-white/10 flex items-center justify-center shadow-2xl text-[#f3eefb] cursor-pointer transition-all hover:-translate-y-1 z-40"
          aria-label="Back to top"
        >
          <i className="fa-solid fa-arrow-up text-sm"></i>
        </button>

      </div>

      {/* ============================================================== */}
      {/* RAKSHITTIPS SUPPORT & DONATE MODAL */}
      {/* ============================================================== */}
      {isDonateOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDonateOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-[#160f24] border border-white/10 rounded-3xl max-w-[440px] w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsDonateOpen(false)}
              className="absolute top-4 right-4 text-[#9a8fb3] hover:text-white text-xl cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-white/5 transition-colors"
            >
              &times;
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ec4899] to-[#f97316] flex items-center justify-center text-white text-xl shadow-lg shadow-pink-500/30 shrink-0">
                <Heart className="w-6 h-6 fill-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-['Syne',sans-serif]">
                  Support &amp; Donate
                </h3>
                <div className="text-xs text-[#9a8fb3]">Rakshittips ({DEVELOPER_NAME})</div>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="bg-[#1a1128] border border-white/10 rounded-2xl p-4 text-center mb-4.5">
              <div className="bg-white p-3 rounded-xl inline-block shadow-md mb-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi%3A%2F%2Fpay%3Fpa%3D${encodeURIComponent(UPI_ID)}%26pn%3DRakshit%2520Dhakariya%26am%3D${donateAmount}%26cu%3DINR`}
                  alt={`UPI QR Code - ₹${donateAmount}`}
                  className="w-36 h-36 object-contain rounded-md mx-auto"
                />
              </div>
              <div className="text-xs font-bold text-white">Scan via GPay, PhonePe, Paytm, BHIM</div>
              <div className="text-[11px] text-[#59e0a8] font-mono mt-0.5">Amount: ₹{donateAmount}</div>
            </div>

            {/* Quick Amount Selector */}
            <div className="mb-4">
              <label className="text-[11px] font-bold text-[#9a8fb3] uppercase tracking-wider block mb-2">
                Choose Amount (INR)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[50, 100, 200, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setDonateAmount(amt)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      donateAmount === amt
                        ? 'bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white border-transparent shadow-md'
                        : 'bg-white/5 border-white/10 text-[#9a8fb3] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* UPI ID Pill with Copy button */}
            <div className="p-3.5 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] text-[#5e5573] font-bold">UPI ID</div>
                <div className="text-xs sm:text-[13px] font-mono font-bold text-[#59e0a8]">{UPI_ID}</div>
              </div>
              <button
                onClick={handleCopyUpi}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-all"
              >
                {copiedUpi ? <Check className="w-3.5 h-3.5 text-[#59e0a8]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Direct Pay Link */}
            <a
              href={`upi://pay?pa=${UPI_ID}&pn=Rakshit%20Dhakariya&am=${donateAmount}&cu=INR`}
              className="w-full bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl hover:brightness-110 active:scale-98 transition-all"
            >
              <i className="fa-solid fa-bolt"></i>
              <span>Pay ₹{donateAmount} via UPI App</span>
            </a>

            <div className="text-center text-[10.5px] text-[#5e5573] mt-3">
              Thank you for supporting 100% free open-source Android projects!
            </div>
          </div>
        </div>
      )}

      {/* DOWNLOAD PROGRESS MODAL */}
      {isDlOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDlOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-[#160f24] border border-white/10 rounded-3xl max-w-[420px] w-full p-7.5 text-center shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setIsDlOpen(false)}
              className="absolute top-4 right-4 text-[#9a8fb3] hover:text-white text-xl cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-white/5 z-10"
            >
              &times;
            </button>

            {/* Icon with celebratory pulse when download starts */}
            <div className={`relative mx-auto mb-4 w-16 h-16 transition-all duration-300 ${downloadStarted ? 'scale-110' : ''}`}>
              <img
                src={APP_ICON}
                onError={handleIconError}
                alt="MRTelegram Icon"
                className="w-16 h-16 rounded-full mx-auto object-cover shadow-xl shadow-blue-500/40 border border-blue-500/40 select-none"
              />
              {downloadStarted && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#59e0a8] text-black font-bold rounded-full flex items-center justify-center text-xs shadow-md animate-bounce">
                  ✓
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-1 font-['Syne',sans-serif]">
              {downloadStarted ? 'Download Triggered! 🎉' : 'Downloading MRTelegram'}
            </h3>
            <p className="text-[12.5px] text-[#9a8fb3]">
              {downloadStarted
                ? 'MRTelegram-V1.0.apk is now downloading to your device!'
                : dlReady
                ? 'APK package verified (SHA256 signature valid)'
                : 'Fetching official build from secure mirror...'}
            </p>

            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden my-5">
              <div
                className={`h-full rounded-full transition-all duration-120 ${
                  downloadStarted
                    ? 'bg-gradient-to-r from-[#10b981] to-[#59e0a8]'
                    : 'bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316]'
                }`}
                style={{ width: `${dlProgress}%` }}
              />
            </div>

            <div className="flex justify-between text-[11.5px] text-[#5e5573] font-mono mb-4.5">
              <span>{((dlProgress / 100) * 68.4).toFixed(1)} MB / 68.4 MB</span>
              <span className={downloadStarted ? 'text-[#59e0a8] font-bold' : ''}>
                {downloadStarted ? 'Complete ✓' : `${dlProgress}%`}
              </span>
            </div>

            {downloadStarted ? (
              <div className="space-y-2.5">
                <div className="w-full bg-gradient-to-r from-[#10b981] via-[#059669] to-[#047857] text-white font-bold py-3.5 rounded-2xl text-sm shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-white" />
                  <span>Download Started! Check Downloads</span>
                </div>
                <button
                  onClick={() => setIsDlOpen(false)}
                  className="w-full bg-white/10 hover:bg-white/15 text-[#f3eefb] font-medium py-2 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : dlReady ? (
              <button
                onClick={saveApkFile}
                className="w-full bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] text-white font-bold py-3.5 rounded-2xl text-sm shadow-xl hover:brightness-110 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Save MRTelegram V1.0.apk</span>
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-white/10 text-[#5e5573] font-semibold py-3.5 rounded-2xl text-sm cursor-not-allowed"
              >
                Downloading...
              </button>
            )}
          </div>
        </div>
      )}

      {/* ABOUT ME MODAL (Rakshittips Developer Bio - Screenshot 3) */}
      {isAboutMeOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAboutMeOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-white text-gray-900 border border-gray-100 rounded-[30px] max-w-[440px] w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAboutMeOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 transition-colors"
            >
              &times;
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8b5cf6] via-[#ec4899] to-[#f97316] flex items-center justify-center text-white text-2xl shadow-lg shadow-pink-500/25 shrink-0">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 font-['Syne',sans-serif]">
                  Rakshit Dhakariya
                </h3>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 rounded-full mt-1 shadow-xs">
                  <span>✓ Verified Solo Developer</span>
                </div>
                <div className="text-[11.5px] text-gray-500 font-medium mt-0.5">
                  @Rakshittips · Android Specialist
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-gray-600 leading-relaxed bg-[#f8f9fc] p-4 rounded-2xl border border-gray-100 mb-5">
              <p>
                Hey there! I'm <strong>Rakshit Dhakariya</strong>, a solo independent developer and Android modder behind the <strong>Rakshittips</strong> ecosystem.
              </p>
              <p>
                My flagship project, <strong>MRTelegram V1.0</strong>, brings the fluid iOS design language to Android alongside 30+ custom features: floating pills, unthrottled downloads, advanced stealth privacy, and custom theme overrides.
              </p>
              <p>
                All my tools and mods are created to be 100% free, privacy-first, and completely ad-free for the global community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <a
                href="https://youtube.com/@rakshittips"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs py-2.5 px-3 rounded-xl border border-red-200 transition-colors"
              >
                <i className="fa-brands fa-youtube text-base text-red-500"></i>
                <span>YouTube</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-pink-50 hover:bg-pink-100 text-[#e1306c] font-bold text-xs py-2.5 px-3 rounded-xl border border-pink-200 transition-colors"
              >
                <i className="fa-brands fa-instagram text-base text-[#e1306c]"></i>
                <span>Instagram</span>
              </a>
            </div>

            <button
              onClick={() => {
                setIsAboutMeOpen(false);
                setIsDonateOpen(true);
              }}
              className="w-full mb-2 bg-[#ec4899] hover:bg-[#db2777] text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1.5"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate &amp; Support ({UPI_ID})</span>
            </button>

            <button
              onClick={() => setIsAboutMeOpen(false)}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toastMsg && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1128]/95 border border-white/20 text-white text-[13px] font-semibold px-5.5 py-2.5 rounded-full shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          {toastMsg}
        </div>
      )}

    </div>
  );
}
