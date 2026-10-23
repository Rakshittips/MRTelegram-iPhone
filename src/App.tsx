/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Download,
  Check,
  Star,
  ChevronRight,
  MessageSquare,
  Phone,
  User,
  Settings as SettingsIcon,
  Shield,
  Zap,
  Volume2,
  Trash2,
  EyeOff,
  UserCheck,
  Lock,
  Moon,
  Info,
  Search,
  Users,
  X,
  Battery,
  Wifi,
  Radio,
  Music,
  Play,
  Pause,
  ExternalLink,
  Sliders,
  Send,
  ArrowRight,
  Eye,
  CheckCheck,
  FileDown,
  Layers,
} from 'lucide-react';

const APP_ICON = './assets/aistudio/skygram_icon_foregroun_d_d937c502.png';

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

  // Hero Card setting rows state
  const [settingRows, setSettingRows] = useState({
    general: true,
    home: true,
    conversation: true,
    privacy: true,
    notifications: true,
  });

  // Active Tool Modal: 'style' | 'font' | 'speed' | 'home' | 'checks' | 'conv' | 'stickers' | 'voice' | 'antidelete' | 'phone' | 'premium' | 'notif' | 'review' | null
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // Feature Tool States for live testing
  const [iosThemeStyle, setIosThemeStyle] = useState<'ios18' | 'default'>('ios18');
  const [springBounce, setSpringBounce] = useState(true);

  const [selectedFont, setSelectedFont] = useState('SF Pro Display');

  const [downloadStreams, setDownloadStreams] = useState(16);
  const [uploadFastlane, setUploadFastlane] = useState(true);
  const [isSpeedTesting, setIsSpeedTesting] = useState(false);
  const [speedBenchmark, setSpeedBenchmark] = useState(94.2);

  const [hideAllFolder, setHideAllFolder] = useState(true);
  const [hideSearchBox, setHideSearchBox] = useState(false);
  const [chatRowLines, setChatRowLines] = useState<2 | 3>(2);

  const [channelChecksHidden, setChannelChecksHidden] = useState(true);

  const [iosInputBar, setIosInputBar] = useState(true);
  const [hapticMenu, setHapticMenu] = useState(true);
  const [bubbleTranslator, setBubbleTranslator] = useState(true);
  const [chatMessageInput, setChatMessageInput] = useState('Hello from MRTelegram iOS style!');

  const [stickerSize, setStickerSize] = useState(14);
  const [selectedStickerEmoji, setSelectedStickerEmoji] = useState('🎉');
  const [bubbleRadius, setBubbleRadius] = useState<'ios' | 'classic' | 'rounded'>('ios');

  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [studioNoiseSuppression, setStudioNoiseSuppression] = useState(true);

  const [antiDeletePreserved, setAntiDeletePreserved] = useState(true);
  const [deletedMsgRevoked, setDeletedMsgRevoked] = useState(true);

  const [phoneMasked, setPhoneMasked] = useState(true);

  const [localPremiumActive, setLocalPremiumActive] = useState(true);

  const [diagnostics, setDiagnostics] = useState({
    permission: true,
    daemon: true,
    battery: true,
    autoStart: true,
  });

  // Download simulation modal state
  const [isDlOpen, setIsDlOpen] = useState(false);
  const [dlProgress, setDlProgress] = useState(0);
  const [dlReady, setDlReady] = useState(false);

  const [isAboutMeOpen, setIsAboutMeOpen] = useState(false);

  // Toast notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`);
  };

  const toggleSettingRow = (key: keyof typeof settingRows, label: string) => {
    const nextVal = !settingRows[key];
    setSettingRows((prev) => ({ ...prev, [key]: nextVal }));
    showToast(`${label}: ${nextVal ? 'Enabled' : 'Disabled'}`);
  };

  const openDownloadModal = () => {
    setIsDlOpen(true);
    setDlProgress(0);
    setDlReady(false);

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

    setIsDlOpen(false);
    showToast('MRTelegram-V1.0.apk saved to Downloads folder!');
  };

  const runSpeedBenchmark = () => {
    setIsSpeedTesting(true);
    setSpeedBenchmark(0);
    let s = 10;
    const interval = setInterval(() => {
      s += Math.floor(Math.random() * 18) + 8;
      if (s >= 94) {
        setSpeedBenchmark(+(94.2 + (Math.random() * 1.5 - 0.7)).toFixed(1));
        setIsSpeedTesting(false);
        clearInterval(interval);
        showToast('Speed benchmark test complete: Turbo stream maxed!');
      } else {
        setSpeedBenchmark(s);
      }
    }, 120);
  };

  // Voice player timer simulation
  useEffect(() => {
    let t: any;
    if (isVoicePlaying) {
      t = setInterval(() => {
        setVoiceSeconds((prev) => {
          if (prev >= 14) {
            setIsVoicePlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      setVoiceSeconds(0);
    }
    return () => clearInterval(t);
  }, [isVoicePlaying]);

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
              onClick={openDownloadModal}
              className="text-[12px] sm:text-[12.5px] font-semibold bg-white/10 hover:bg-white/15 border border-white/15 hover:border-white/25 px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer text-white transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-[#59e0a8]" />
              <span>Download APK</span>
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

              <a
                href="#features"
                className="border border-white/10 hover:bg-white/5 text-[#9a8fb3] hover:text-[#f3eefb] font-semibold text-[13px] px-5 py-3.5 rounded-2xl inline-flex items-center gap-1.5 transition-colors"
              >
                <Sliders className="w-4 h-4 text-[#b79bfb]" /> Explore Features
              </a>
            </div>
          </div>

          {/* Right Hero Card (Fully Interactive settings group) */}
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
                      Custom settings hub · Tap any row to test
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
                <div
                  onClick={() => setActiveTool('style')}
                  className="bg-[#1a1128] hover:bg-white/8 border border-white/8 rounded-[12px] px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-all active:scale-98 group"
                >
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-sliders text-[#b79bfb] w-4 text-center"></i>
                    <span className="font-semibold text-white group-hover:text-[#b79bfb] transition-colors">General Settings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[#5e5573] font-mono">iOS 18 Liquid</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5e5573]" />
                  </div>
                </div>

                {/* Row 2: Home */}
                <div
                  onClick={() => setActiveTool('home')}
                  className="bg-[#1a1128] hover:bg-white/8 border border-white/8 rounded-[12px] px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-all active:scale-98 group"
                >
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-house text-[#ffab6b] w-4 text-center"></i>
                    <span className="font-semibold text-white group-hover:text-[#ffab6b] transition-colors">Home Screen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[#5e5573] font-mono">2-Line mode</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5e5573]" />
                  </div>
                </div>

                {/* Row 3: Conversation */}
                <div
                  onClick={() => setActiveTool('conv')}
                  className="bg-[#1a1128] hover:bg-white/8 border border-white/8 rounded-[12px] px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-all active:scale-98 group"
                >
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-comments text-[#7cc0ff] w-4 text-center"></i>
                    <span className="font-semibold text-white group-hover:text-[#7cc0ff] transition-colors">Conversation Screen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[#5e5573] font-mono">Cupertino bar</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5e5573]" />
                  </div>
                </div>

                {/* Row 4: Privacy */}
                <div
                  onClick={() => setActiveTool('antidelete')}
                  className="bg-[#1a1128] hover:bg-white/8 border border-white/8 rounded-[12px] px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-all active:scale-98 group"
                >
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-shield-halved text-[#ff7f9c] w-4 text-center"></i>
                    <span className="font-semibold text-white group-hover:text-[#ff7f9c] transition-colors">Privacy & Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[#59e0a8] font-mono">Anti-Delete ON</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5e5573]" />
                  </div>
                </div>

                {/* Row 5: Notifications */}
                <div
                  onClick={() => setActiveTool('notif')}
                  className="bg-[#1a1128] hover:bg-white/8 border border-white/8 rounded-[12px] px-3.5 py-2.5 flex items-center justify-between cursor-pointer transition-all active:scale-98 group"
                >
                  <div className="flex items-center gap-2.5">
                    <i className="fa-solid fa-bell text-[#59e0a8] w-4 text-center"></i>
                    <span className="font-semibold text-white group-hover:text-[#59e0a8] transition-colors">Notification Preferences</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10.5px] text-[#59e0a8] font-mono">Unrestricted</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5e5573]" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* FEATURES (Interactive Cards with "Try it" Live Modals) */}
        <section id="features" className="py-13 border-t border-white/8">
          <div className="max-w-[560px] mb-8">
            <div className="text-[11.5px] font-bold text-[#5e5573] tracking-wider mb-2">FEATURES &amp; LIVE TOOLS</div>
            <h2 className="text-2xl sm:text-[28px] font-bold leading-[1.15] text-white font-['Syne',sans-serif]">
              Everything the settings screens give you
            </h2>
            <p className="text-[13.5px] text-[#9a8fb3] mt-2.5">
              Every card below is 100% interactive. Click any feature to open its real testing simulator and experience the tool firsthand!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            
            {/* Card 1: iOS Interface Style */}
            <div
              onClick={() => setActiveTool('style')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#8b5cf6]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-blue-500/15 text-[#7cc0ff] flex items-center justify-center text-sm">
                  <i className="fa-brands fa-apple text-base"></i>
                </div>
                <span className="text-[11px] font-bold text-[#b79bfb] bg-purple-500/15 group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:to-[#ec4899] group-hover:text-white px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">iOS interface style</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Switch between Telegram (default) and iOS fluid physics. Screens not yet adapted keep the official look.
              </p>
            </div>

            {/* Card 2: App font */}
            <div
              onClick={() => setActiveTool('font')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#8b5cf6]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-purple-500/15 text-[#b79bfb] flex items-center justify-center text-sm">
                  <i className="fa-solid fa-font"></i>
                </div>
                <span className="text-[11px] font-bold text-[#b79bfb] bg-purple-500/15 group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:to-[#ec4899] group-hover:text-white px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">App font</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Pick iOS SF Pro Text, Samsung One UI 6, Linotte, Rubrik Sans, Expletus Sans or your system font.
              </p>
            </div>

            {/* Card 3: Faster downloads */}
            <div
              onClick={() => setActiveTool('speed')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#59e0a8]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-emerald-500/15 text-[#59e0a8] flex items-center justify-center text-sm">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#59e0a8] bg-emerald-500/15 group-hover:bg-gradient-to-r group-hover:from-[#10b981] group-hover:to-[#59e0a8] group-hover:text-black px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Faster downloads &amp; uploads</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Transfers files in parallel, with 16x turbo stream acceleration you choose.
              </p>
            </div>

            {/* Card 4: Home screen */}
            <div
              onClick={() => setActiveTool('home')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#ffab6b]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-amber-500/15 text-[#ffab6b] flex items-center justify-center text-sm">
                  <i className="fa-solid fa-house"></i>
                </div>
                <span className="text-[11px] font-bold text-[#ffab6b] bg-amber-500/15 group-hover:bg-gradient-to-r group-hover:from-[#f97316] group-hover:to-[#ffab6b] group-hover:text-black px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Home screen customizer</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Hide the All folder or search bar, customize folder style, and toggle 2 or 3 lines per chat row.
              </p>
            </div>

            {/* Card 5: Hide read checks in channels */}
            <div
              onClick={() => setActiveTool('checks')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#f592c0]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-pink-500/15 text-[#f592c0] flex items-center justify-center text-sm">
                  <CheckCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#f592c0] bg-pink-500/15 group-hover:bg-gradient-to-r group-hover:from-[#ec4899] group-hover:to-[#f592c0] group-hover:text-white px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Hide read checks in channels</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Removes sent and read checkmarks in channels only. Chats and groups stay completely normal.
              </p>
            </div>

            {/* Card 6: Conversation screen */}
            <div
              onClick={() => setActiveTool('conv')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#7cc0ff]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-blue-500/15 text-[#7cc0ff] flex items-center justify-center text-sm">
                  <i className="fa-solid fa-comments"></i>
                </div>
                <span className="text-[11px] font-bold text-[#7cc0ff] bg-blue-500/15 group-hover:bg-gradient-to-r group-hover:from-[#3b82f6] group-hover:to-[#7cc0ff] group-hover:text-white px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Conversation screen</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                iOS-style header, Cupertino input bar, search circle and context menu, plus instant translation.
              </p>
            </div>

            {/* Card 7: Stickers and bubbles */}
            <div
              onClick={() => setActiveTool('stickers')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#b79bfb]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-purple-500/15 text-[#b79bfb] flex items-center justify-center text-sm">
                  <i className="fa-regular fa-face-smile"></i>
                </div>
                <span className="text-[11px] font-bold text-[#b79bfb] bg-purple-500/15 group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:to-[#ec4899] group-hover:text-white px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Stickers and bubbles</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Resize stickers with an interactive live slider and choose your custom bubble corner style.
              </p>
            </div>

            {/* Card 8: Voice messages */}
            <div
              onClick={() => setActiveTool('voice')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#59e0a8]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-emerald-500/15 text-[#59e0a8] flex items-center justify-center text-sm">
                  <Volume2 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#59e0a8] bg-emerald-500/15 group-hover:bg-gradient-to-r group-hover:from-[#10b981] group-hover:to-[#59e0a8] group-hover:text-black px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Voice messages optimizer</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Reduces noise and echo with studio suppression and evens out volume while you record.
              </p>
            </div>

            {/* Card 9: View deleted messages */}
            <div
              onClick={() => setActiveTool('antidelete')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#ff7f9c]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-red-500/15 text-[#ff7f9c] flex items-center justify-center text-sm">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#ff7f9c] bg-red-500/15 group-hover:bg-gradient-to-r group-hover:from-[#f43f5e] group-hover:to-[#ff7f9c] group-hover:text-white px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">View deleted messages</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Keeps messages deleted after you received them and marks them as preserved on your phone.
              </p>
            </div>

            {/* Card 10: Hide phone number */}
            <div
              onClick={() => setActiveTool('phone')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#ffab6b]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-amber-500/15 text-[#ffab6b] flex items-center justify-center text-sm">
                  <EyeOff className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#ffab6b] bg-amber-500/15 group-hover:bg-gradient-to-r group-hover:from-[#f97316] group-hover:to-[#ffab6b] group-hover:text-black px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Hide phone number</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Hides your number inside the MRTelegram interface while retaining account login credentials.
              </p>
            </div>

            {/* Card 11: Local Premium */}
            <div
              onClick={() => setActiveTool('premium')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#f592c0]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-pink-500/15 text-[#f592c0] flex items-center justify-center text-sm">
                  <Star className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-[#f592c0] bg-pink-500/15 group-hover:bg-gradient-to-r group-hover:from-[#ec4899] group-hover:to-[#f592c0] group-hover:text-white px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
              </div>
              <h3 className="text-[14.5px] font-bold text-white mb-1.5">Local Premium unlock</h3>
              <p className="text-[12.5px] text-[#9a8fb3] leading-relaxed">
                Treats your account as Premium inside the app, so interface premium badges and reactions work locally.
              </p>
            </div>

            {/* Card 12: Notification preferences */}
            <div
              onClick={() => setActiveTool('notif')}
              className="bg-[#130c20] hover:bg-[#1a1128] border border-white/8 hover:border-[#59e0a8]/40 rounded-[18px] p-5.5 cursor-pointer transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-9.5 h-9.5 rounded-[11px] bg-emerald-500/15 text-[#59e0a8] flex items-center justify-center text-sm">
                  <i className="fa-solid fa-bell"></i>
                </div>
                <span className="text-[11px] font-bold text-[#59e0a8] bg-emerald-500/15 group-hover:bg-gradient-to-r group-hover:from-[#10b981] group-hover:to-[#59e0a8] group-hover:text-black px-2.5 py-1 rounded-md flex items-center gap-1 transition-all">
                  Try tool <ArrowRight className="w-3 h-3" />
                </span>
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
      {/* FULL WORKING INTERACTIVE FEATURE TESTING MODAL */}
      {activeTool && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveTool(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
        >
          <div className="bg-[#160f24] border border-white/10 rounded-3xl max-w-[460px] w-full p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveTool(null)}
              className="absolute top-4 right-4 text-[#9a8fb3] hover:text-white text-xl cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-white/5"
            >
              &times;
            </button>

            {/* Tool 1: iOS Interface Style */}
            {activeTool === 'style' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#7cc0ff] flex items-center justify-center text-lg">
                    <i className="fa-brands fa-apple"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">iOS Interface Style</h3>
                    <p className="text-[11px] text-[#5e5573]">Visual presentation &amp; physics simulation</p>
                  </div>
                </div>

                <p className="text-xs text-[#9a8fb3] mb-3">
                  Toggle interface aesthetic and feel real fluid navigation feedback:
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => {
                      setIosThemeStyle('ios18');
                      showToast('Switched to iOS 18 Liquid theme');
                    }}
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                      iosThemeStyle === 'ios18'
                        ? 'bg-[#8b5cf6]/20 border-[#8b5cf6] text-[#b79bfb]'
                        : 'bg-white/5 border-transparent text-[#9a8fb3]'
                    }`}
                  >
                    <i className="fa-brands fa-apple"></i> iOS 18 Liquid
                  </button>
                  <button
                    onClick={() => {
                      setIosThemeStyle('default');
                      showToast('Switched to Telegram Default style');
                    }}
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                      iosThemeStyle === 'default'
                        ? 'bg-[#8b5cf6]/20 border-[#8b5cf6] text-[#b79bfb]'
                        : 'bg-white/5 border-transparent text-[#9a8fb3]'
                    }`}
                  >
                    <i className="fa-brands fa-telegram"></i> Telegram Default
                  </button>
                </div>

                <div className="bg-[#1a1128] rounded-xl p-3 mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Spring bounce physics</div>
                    <div className="text-[10px] text-[#5e5573]">Apple-style rubber-band scroll elasticity</div>
                  </div>
                  <button
                    onClick={() => {
                      setSpringBounce(!springBounce);
                      showToast(`Spring bounce physics: ${!springBounce ? 'Enabled' : 'Disabled'}`);
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      springBounce ? 'bg-[#30d158]' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                        springBounce ? 'translate-x-5.5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-[#7cc0ff]">
                  <i className="fa-solid fa-info-circle mr-1"></i> Mode active: Any chat or channel opened uses {iosThemeStyle === 'ios18' ? 'iOS 18 translucent glass headers and blurred toolbars.' : 'Stock Telegram Android styling.'}
                </div>
              </div>
            )}

            {/* Tool 2: App Font */}
            {activeTool === 'font' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-[#b79bfb] flex items-center justify-center text-lg">
                    <i className="fa-solid fa-font"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">App Font Preview</h3>
                    <p className="text-[11px] text-[#5e5573]">System typography selector</p>
                  </div>
                </div>

                <div className="bg-[#0e0817] border border-white/8 rounded-xl p-4 text-center mb-4">
                  <div
                    className="text-lg font-bold text-white transition-all"
                    style={{
                      fontFamily:
                        selectedFont === 'SF Pro Display'
                          ? '-apple-system, BlinkMacSystemFont, sans-serif'
                          : selectedFont === 'Samsung One UI'
                          ? '"Samsung One", sans-serif'
                          : selectedFont === 'Linotte'
                          ? 'cursive, sans-serif'
                          : selectedFont === 'Rubrik'
                          ? 'sans-serif'
                          : 'inherit',
                    }}
                  >
                    The quick brown fox jumps over 42 messages.
                  </div>
                  <div className="text-[11px] text-[#5e5573] mt-1.5 font-mono">
                    Font: {selectedFont} · 10:42 AM · 35,702 messages
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {['SF Pro Display', 'Samsung One UI', 'Linotte', 'Rubrik Sans'].map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        setSelectedFont(f);
                        showToast(`App typography updated to ${f}`);
                      }}
                      className={`p-2.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                        selectedFont === f
                          ? 'bg-[#8b5cf6]/20 border-[#8b5cf6] text-[#b79bfb]'
                          : 'bg-white/5 border-transparent text-[#9a8fb3]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tool 3: Turbo Speed */}
            {activeTool === 'speed' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#59e0a8] flex items-center justify-center text-lg">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">Turbo Speed Accelerator</h3>
                    <p className="text-[11px] text-[#5e5573]">Parallel chunk transmission engine</p>
                  </div>
                </div>

                <div className="bg-[#1a1128] rounded-xl p-3.5 mb-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-white">Parallel Download Streams</span>
                    <span className="text-xs font-bold text-[#59e0a8] font-mono">{downloadStreams}x Turbo</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    step="4"
                    value={downloadStreams}
                    onChange={(e) => setDownloadStreams(Number(e.target.value))}
                    className="w-full accent-[#59e0a8] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#5e5573] mt-1 font-mono">
                    <span>4 streams</span>
                    <span>16 standard</span>
                    <span>32 max</span>
                  </div>
                </div>

                <div className="bg-[#1a1128] rounded-xl p-3 mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Upload Fastlane Buffer</div>
                    <div className="text-[10px] text-[#5e5573]">Reduces server round-trip handshake latency</div>
                  </div>
                  <button
                    onClick={() => {
                      setUploadFastlane(!uploadFastlane);
                      showToast(`Upload Fastlane: ${!uploadFastlane ? 'Active' : 'Disabled'}`);
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      uploadFastlane ? 'bg-[#30d158]' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                        uploadFastlane ? 'translate-x-5.5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-center mb-3">
                  <div className="text-[11px] text-[#9a8fb3] mb-1">Benchmarked Real-Time Throughput</div>
                  <div className="text-2xl font-black text-[#59e0a8] font-mono">
                    {speedBenchmark} MB/s
                  </div>
                  <button
                    onClick={runSpeedBenchmark}
                    disabled={isSpeedTesting}
                    className="mt-2 text-[11px] font-bold bg-[#59e0a8] text-black px-3.5 py-1.5 rounded-lg cursor-pointer hover:brightness-105 active:scale-95 transition-all"
                  >
                    {isSpeedTesting ? 'Testing stream...' : 'Run Live Speed Test'}
                  </button>
                </div>
              </div>
            )}

            {/* Tool 4: Home Screen Customizer */}
            {activeTool === 'home' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#ffab6b] flex items-center justify-center text-lg">
                    <i className="fa-solid fa-house"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">Home Screen Customizer</h3>
                    <p className="text-[11px] text-[#5e5573]">Chat list layout &amp; folder visibility</p>
                  </div>
                </div>

                <div className="space-y-2.5 mb-4">
                  <div className="bg-[#1a1128] rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Hide "All" folder tab</div>
                      <div className="text-[10px] text-[#5e5573]">Only show customized categorized folders</div>
                    </div>
                    <button
                      onClick={() => setHideAllFolder(!hideAllFolder)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        hideAllFolder ? 'bg-[#30d158]' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                        hideAllFolder ? 'translate-x-5.5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="bg-[#1a1128] rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Hide search bar</div>
                      <div className="text-[10px] text-[#5e5573]">Keep header minimalist and compact</div>
                    </div>
                    <button
                      onClick={() => setHideSearchBox(!hideSearchBox)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        hideSearchBox ? 'bg-[#30d158]' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                        hideSearchBox ? 'translate-x-5.5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="bg-[#1a1128] rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Chat preview lines</div>
                      <div className="text-[10px] text-[#5e5573]">Amount of message text shown per chat row</div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setChatRowLines(2)}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer ${
                          chatRowLines === 2 ? 'bg-[#ffab6b] text-black' : 'bg-white/10 text-white'
                        }`}
                      >
                        2 Lines
                      </button>
                      <button
                        onClick={() => setChatRowLines(3)}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer ${
                          chatRowLines === 3 ? 'bg-[#ffab6b] text-black' : 'bg-white/10 text-white'
                        }`}
                      >
                        3 Lines
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tool 5: Hide Read Checks */}
            {activeTool === 'checks' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-[#f592c0] flex items-center justify-center text-lg">
                    <CheckCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">Channel Stealth Reading</h3>
                    <p className="text-[11px] text-[#5e5573]">Read without triggering channel view counts</p>
                  </div>
                </div>

                <div className="bg-[#1a1128] border border-white/8 rounded-2xl p-4 mb-4">
                  <div className="text-[10.5px] text-[#5e5573] mb-2 font-mono">Channel Post Preview:</div>
                  <div className="bg-[#28183c] rounded-xl p-3 flex justify-between items-end">
                    <span className="text-xs text-white">"MRTelegram release build v10.8.2 is live with stealth mode."</span>
                    <span className={`text-[11px] font-bold ml-2 ${channelChecksHidden ? 'text-[#9a8fb3]' : 'text-[#59e0a8]'}`}>
                      {channelChecksHidden ? (
                        <span className="flex items-center gap-1"><EyeOff className="w-3 h-3" /> Hidden</span>
                      ) : (
                        <span className="flex items-center gap-1"><CheckCheck className="w-3 h-3" /> Read</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="bg-[#1a1128] rounded-xl p-3 mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Stealth read checks in channels</div>
                    <div className="text-[10px] text-[#5e5573]">Keeps your profile hidden from admin view logs</div>
                  </div>
                  <button
                    onClick={() => {
                      setChannelChecksHidden(!channelChecksHidden);
                      showToast(`Channel read checks: ${!channelChecksHidden ? 'Stealth Hidden' : 'Visible'}`);
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      channelChecksHidden ? 'bg-[#30d158]' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      channelChecksHidden ? 'translate-x-5.5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            )}

            {/* Tool 6: Conversation screen */}
            {activeTool === 'conv' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-[#7cc0ff] flex items-center justify-center text-lg">
                    <i className="fa-solid fa-comments"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">Conversation Screen Tools</h3>
                    <p className="text-[11px] text-[#5e5573]">Cupertino input bar &amp; context helpers</p>
                  </div>
                </div>

                <div className="bg-[#0e0817] border border-white/8 rounded-2xl p-3.5 mb-4">
                  <div className="text-[10px] text-[#5e5573] mb-2 font-mono">Cupertino Chat Input Bar:</div>
                  <div className="flex items-center gap-2 bg-[#1a1128] rounded-full px-3 py-2 border border-white/10">
                    <input
                      type="text"
                      value={chatMessageInput}
                      onChange={(e) => setChatMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="bg-transparent flex-1 text-xs text-white focus:outline-none"
                    />
                    <button
                      onClick={() => showToast(`Simulated message sent: "${chatMessageInput}"`)}
                      className="w-6 h-6 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="bg-[#1a1128] rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Instant message bubble translator</div>
                      <div className="text-[10px] text-[#5e5573]">Translate foreign chats inline without switching apps</div>
                    </div>
                    <button
                      onClick={() => setBubbleTranslator(!bubbleTranslator)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        bubbleTranslator ? 'bg-[#30d158]' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                        bubbleTranslator ? 'translate-x-5.5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  <div className="bg-[#1a1128] rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white">Cupertino haptic context menu</div>
                      <div className="text-[10px] text-[#5e5573]">Long press message menu with quick reactions</div>
                    </div>
                    <button
                      onClick={() => setHapticMenu(!hapticMenu)}
                      className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                        hapticMenu ? 'bg-[#30d158]' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                        hapticMenu ? 'translate-x-5.5' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tool 7: Stickers and Bubbles */}
            {activeTool === 'stickers' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-[#b79bfb] flex items-center justify-center text-lg">
                    <i className="fa-regular fa-face-smile"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">Stickers &amp; Bubble Resizer</h3>
                    <p className="text-[11px] text-[#5e5573]">Interactive live scale simulator</p>
                  </div>
                </div>

                <div className="bg-[#0e0817] border border-white/8 rounded-2xl p-6 text-center mb-4">
                  <div
                    className="inline-block transition-transform duration-100"
                    style={{ transform: `scale(${stickerSize / 14})` }}
                  >
                    <span className="text-4xl">{selectedStickerEmoji}</span>
                  </div>
                  <div className="text-[11px] text-[#9a8fb3] mt-3 font-mono">
                    Size: <strong className="text-[#b79bfb]">{stickerSize}</strong> px unit
                  </div>
                </div>

                <div className="flex justify-center gap-2 mb-4">
                  {['🎉', '🚀', '🔥', '💎', '❤️'].map((em) => (
                    <button
                      key={em}
                      onClick={() => setSelectedStickerEmoji(em)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center cursor-pointer ${
                        selectedStickerEmoji === em ? 'bg-purple-500/20 border border-purple-500' : 'bg-white/5'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>

                <div className="bg-[#1a1128] rounded-xl p-3.5 mb-4">
                  <label className="text-xs font-semibold text-white block mb-2">
                    Resize Slider (10 to 22):
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="22"
                    value={stickerSize}
                    onChange={(e) => setStickerSize(Number(e.target.value))}
                    className="w-full accent-[#8b5cf6] cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* Tool 8: Voice messages */}
            {activeTool === 'voice' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#59e0a8] flex items-center justify-center text-lg">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">Voice Message Optimizer</h3>
                    <p className="text-[11px] text-[#5e5573]">Live waveform audio simulation</p>
                  </div>
                </div>

                <div className="bg-[#1a1128] border border-white/8 rounded-2xl p-4 flex items-center gap-3.5 mb-4">
                  <button
                    onClick={() => setIsVoicePlaying(!isVoicePlaying)}
                    className="w-10 h-10 rounded-full bg-[#59e0a8] text-black flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-md"
                  >
                    {isVoicePlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                  </button>

                  <div className="flex-1 flex items-center gap-1.5 h-8">
                    {[12, 22, 16, 28, 14, 26, 18, 30, 16, 24, 12, 20].map((h, i) => (
                      <div
                        key={i}
                        className={`w-1.5 rounded-full transition-all duration-200 ${
                          isVoicePlaying ? 'bg-[#59e0a8]' : 'bg-slate-700'
                        }`}
                        style={{
                          height: isVoicePlaying ? `${((h * ((i % 3) + 1)) % 26) + 8}px` : `${h / 2}px`,
                        }}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-mono text-[#59e0a8]">
                    0:{voiceSeconds < 10 ? `0${voiceSeconds}` : voiceSeconds} / 0:14
                  </span>
                </div>

                <div className="bg-[#1a1128] rounded-xl p-3 mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Studio Noise Suppression</div>
                    <div className="text-[10px] text-[#5e5573]">Eliminates wind, fan, and room reverb</div>
                  </div>
                  <button
                    onClick={() => {
                      setStudioNoiseSuppression(!studioNoiseSuppression);
                      showToast(`Studio Noise Suppression: ${!studioNoiseSuppression ? 'Enabled' : 'Disabled'}`);
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      studioNoiseSuppression ? 'bg-[#30d158]' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      studioNoiseSuppression ? 'translate-x-5.5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            )}

            {/* Tool 9: Anti-Delete Guard */}
            {activeTool === 'antidelete' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 text-[#ff7f9c] flex items-center justify-center text-lg">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">Anti-Delete Message Guard</h3>
                    <p className="text-[11px] text-[#5e5573]">Preserves retracted text &amp; media locally</p>
                  </div>
                </div>

                <div className="bg-[#1c0f1a] border border-red-500/30 rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#ff7f9c] mb-1">
                    <Shield className="w-3.5 h-3.5" /> Preserved Revoked Chat Note:
                  </div>
                  <div className="text-sm font-medium text-white my-1.5">
                    "Hey, the password for the meeting room is 8842!"
                  </div>
                  <div className="text-[10px] text-[#ff7f9c] font-mono">
                    Deleted by sender 2m ago · Saved in local phone memory
                  </div>
                </div>

                <div className="bg-[#1a1128] rounded-xl p-3 mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Keep revoked messages</div>
                    <div className="text-[10px] text-[#5e5573]">Prevents chat disappearances on your device</div>
                  </div>
                  <button
                    onClick={() => {
                      setAntiDeletePreserved(!antiDeletePreserved);
                      showToast(`Anti-Delete guard: ${!antiDeletePreserved ? 'Active' : 'Disabled'}`);
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      antiDeletePreserved ? 'bg-[#30d158]' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      antiDeletePreserved ? 'translate-x-5.5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            )}

            {/* Tool 10: Hide Phone Number */}
            {activeTool === 'phone' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[#ffab6b] flex items-center justify-center text-lg">
                    <EyeOff className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">Phone Number Privacy</h3>
                    <p className="text-[11px] text-[#5e5573]">Client-side interface mask</p>
                  </div>
                </div>

                <div className="bg-[#1a1128] border border-white/8 rounded-2xl p-4 text-center mb-4">
                  <div className="text-[11px] text-[#5e5573] font-mono">Profile Screen Display:</div>
                  <div className="text-xl font-bold text-[#ffab6b] font-mono my-2 tracking-wider">
                    {phoneMasked ? '•••• •••• ••••' : '+1 (555) 019-2834'}
                  </div>
                  <div className="text-[10px] text-[#9a8fb3]">
                    {phoneMasked ? 'Hidden from screenshots and screen recordings' : 'Shown normally in app menu'}
                  </div>
                </div>

                <div className="bg-[#1a1128] rounded-xl p-3 mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Mask phone number in UI</div>
                    <div className="text-[10px] text-[#5e5573]">Telegram official privacy rules remain unchanged</div>
                  </div>
                  <button
                    onClick={() => {
                      setPhoneMasked(!phoneMasked);
                      showToast(`Phone number: ${!phoneMasked ? 'Masked' : 'Revealed'}`);
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      phoneMasked ? 'bg-[#30d158]' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      phoneMasked ? 'translate-x-5.5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            )}

            {/* Tool 11: Local Premium */}
            {activeTool === 'premium' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-[#f592c0] flex items-center justify-center text-lg">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">Local Premium Features</h3>
                    <p className="text-[11px] text-[#5e5573]">Interface premium perks unlock</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 border border-pink-500/30 rounded-2xl p-4 mb-4">
                  <div className="font-bold text-xs text-[#f592c0] flex items-center gap-1.5 mb-2">
                    <Star className="w-4 h-4 fill-pink-400" /> Active Local Premium Perks:
                  </div>
                  <ul className="text-xs text-[#9a8fb3] space-y-1.5">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#59e0a8]" /> 4GB badge on heavy uploads
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#59e0a8]" /> Animated reaction emoji picker
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#59e0a8]" /> Custom application app icon selection
                    </li>
                  </ul>
                </div>

                <div className="bg-[#1a1128] rounded-xl p-3 mb-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Enable Local Premium mode</div>
                    <div className="text-[10px] text-[#5e5573]">Applies premium layout styling on this device</div>
                  </div>
                  <button
                    onClick={() => {
                      setLocalPremiumActive(!localPremiumActive);
                      showToast(`Local Premium: ${!localPremiumActive ? 'Enabled' : 'Disabled'}`);
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      localPremiumActive ? 'bg-[#30d158]' : 'bg-slate-700'
                    }`}
                  >
                    <span className={`block w-5 h-5 bg-white rounded-full transition-transform absolute top-0.5 ${
                      localPremiumActive ? 'translate-x-5.5' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>
            )}

            {/* Tool 12: Notification Diagnostics */}
            {activeTool === 'notif' && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-[#59e0a8] flex items-center justify-center text-lg">
                    <i className="fa-solid fa-bell"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-['Syne',sans-serif]">Notification Diagnostics</h3>
                    <p className="text-[11px] text-[#5e5573]">Ensure zero delayed alerts on Android</p>
                  </div>
                </div>

                <p className="text-xs text-[#9a8fb3] mb-3">
                  Tap any item to test and toggle diagnostic status:
                </p>

                <div className="space-y-2 mb-4">
                  <div
                    onClick={() => {
                      const next = !diagnostics.permission;
                      setDiagnostics({ ...diagnostics, permission: next });
                      showToast(`Notification Permission: ${next ? 'Allowed' : 'Denied'}`);
                    }}
                    className="bg-[#1a1128] hover:bg-white/8 rounded-xl p-3 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-white">System Notification Permission</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      diagnostics.permission ? 'bg-[#59e0a8]/20 text-[#59e0a8]' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {diagnostics.permission ? 'Allowed' : 'Blocked'}
                    </span>
                  </div>

                  <div
                    onClick={() => {
                      const next = !diagnostics.daemon;
                      setDiagnostics({ ...diagnostics, daemon: next });
                      showToast(`Push Daemon: ${next ? 'Active' : 'Disabled'}`);
                    }}
                    className="bg-[#1a1128] hover:bg-white/8 rounded-xl p-3 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-white">Persistent Background Push Daemon</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      diagnostics.daemon ? 'bg-[#59e0a8]/20 text-[#59e0a8]' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {diagnostics.daemon ? 'Active' : 'Stopped'}
                    </span>
                  </div>

                  <div
                    onClick={() => {
                      const next = !diagnostics.battery;
                      setDiagnostics({ ...diagnostics, battery: next });
                      showToast(`Battery Optimization: ${next ? 'Unrestricted' : 'Optimized'}`);
                    }}
                    className="bg-[#1a1128] hover:bg-white/8 rounded-xl p-3 flex items-center justify-between cursor-pointer"
                  >
                    <span className="text-xs font-semibold text-white">Battery Optimization Setting</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      diagnostics.battery ? 'bg-[#59e0a8]/20 text-[#59e0a8]' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {diagnostics.battery ? 'Unrestricted' : 'Optimized'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-[#ffab6b]">
                  <strong>Xiaomi / Samsung / OnePlus tip:</strong> Enable "Auto-start" in App Info so MRTelegram delivers message alerts even after reboot.
                </div>
              </div>
            )}

            {/* Bottom Done button */}
            <button
              onClick={() => {
                setActiveTool(null);
                showToast('Settings saved & applied!');
              }}
              className="w-full mt-4 bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] text-white font-bold text-xs py-3 rounded-xl cursor-pointer hover:brightness-110 active:scale-98 transition-all"
            >
              Apply &amp; Done
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DOWNLOAD PROGRESS MODAL */}
      {/* ============================================================== */}
      {isDlOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDlOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="bg-[#160f24] border border-white/10 rounded-3xl max-w-[420px] w-full p-7.5 text-center shadow-2xl relative">
            <button
              onClick={() => setIsDlOpen(false)}
              className="absolute top-4 right-4 text-[#9a8fb3] hover:text-white text-xl cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-white/5"
            >
              &times;
            </button>

            <img
              src={APP_ICON}
              onError={handleIconError}
              alt="MRTelegram Icon"
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover shadow-xl shadow-blue-500/40 border border-blue-500/40 select-none"
            />

            <h3 className="text-xl font-bold text-white mb-1 font-['Syne',sans-serif]">
              Downloading MRTelegram
            </h3>
            <p className="text-[12.5px] text-[#9a8fb3]">
              {dlReady ? 'APK package verified (SHA256 signature valid)' : 'Fetching official build from secure mirror...'}
            </p>

            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden my-5">
              <div
                className="h-full bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] rounded-full transition-all duration-120"
                style={{ width: `${dlProgress}%` }}
              />
            </div>

            <div className="flex justify-between text-[11.5px] text-[#5e5573] font-mono mb-4.5">
              <span>{((dlProgress / 100) * 68.4).toFixed(1)} MB / 68.4 MB</span>
              <span>{dlProgress}%</span>
            </div>

            {dlReady ? (
              <button
                onClick={saveApkFile}
                className="w-full bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] text-white font-bold py-3.5 rounded-2xl text-sm shadow-xl hover:brightness-110 active:scale-98 transition-all cursor-pointer"
              >
                Save MRTelegram V1.0.apk
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
              onClick={() => setIsAboutMeOpen(false)}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold text-xs py-3 rounded-xl cursor-pointer transition-colors"
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
