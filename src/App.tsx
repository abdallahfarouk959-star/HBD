import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowDown, Star, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

import ParticleBackground from './components/ParticleBackground';
import FloatingElements from './components/FloatingElements';
import GalleryCarousel from './components/GalleryCarousel';
import WishLetter from './components/WishLetter';
import VirtualCake from './components/VirtualCake';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate Countdown to Malak's Special Birthday Event
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      let targetYear = now.getFullYear();
      let targetDate = new Date(`June 14, ${targetYear} 23:59:59`);
      
      if (now.getTime() > targetDate.getTime()) {
        targetYear++;
        targetDate = new Date(`June 14, ${targetYear} 23:59:59`);
      }

      const diff = targetDate.getTime() - now.getTime();
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setCountdown({ days: d, hours: h, minutes: m, seconds: s });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRevealMagic = () => {
    setIsRevealed(true);

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ecc0bc', '#fde047', '#ff1493', '#00f0ff'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fbbf24', '#ecc0bc'],
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fbbf24', '#ecc0bc'],
      });
    }, 400);

    setTimeout(() => {
      const music = document.getElementById('bg-music-player') as HTMLAudioElement;
      if (music) {
        music.play().catch(e => console.log("Autoplay context waiting:", e));
      }
    }, 100);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-magic-dark select-none text-white font-sans dir-rtl" style={{ direction: 'rtl' }} id="root-portal">
      
      
      <div className="fixed inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90 pointer-events-none z-1"></div>

      {/* A. CINEMATIC REVEAL GATE OVERLAY */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            key="reveal-gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#06030c] z-50 flex flex-col items-center justify-center p-6 text-center"
            id="reveal-gate-overlay"
          >
            <div className="absolute w-80 h-80 bg-neon-purple/20 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute w-64 h-64 bg-rose-gold/25 rounded-full blur-2xl -translate-y-12 opacity-30"></div>

            <div className="z-10 max-w-lg flex flex-col items-center relative gap-6">
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-full border border-rose-gold/35 flex items-center justify-center bg-magic-purple/60 shadow-neon-gold mb-2 relative"
              >
                <div className="absolute inset-0.5 rounded-full border border-dashed border-rose-gold/20 animate-slow-spin"></div>
                <Sparkles className="w-6 h-6 text-gold-200" />
              </motion.div>

              <div className="space-y-3">
                <span className="text-[11px] font-mono tracking-widest text-rose-gold uppercase opacity-80 block">
                  إهداء من حتة من سما ✨
                </span>
                
                <h1 className="font-serif text-3xl md:text-4xl text-rose-gold-light font-medium tracking-wide">
                  الدنيا مليانة بالناس الجميلة.. بس إنتِ غير!
                </h1>
                
                <p className="text-sm text-white/60 leading-relaxed max-w-sm mx-auto font-light">
                  ورا النجوم دي فيه احتفال سحري ومخصوص معمول من النور والأمنيات الصافية.. جاهز ومستني لأحلى وأرق بنوتة في الدنيا كلها.
                </p>
              </div>

              <motion.button
                onClick={handleRevealMagic}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-8 py-3.5 bg-gradient-to-r from-rose-gold-dark/40 to-magic-purple/50 text-gold-300 font-mono text-xs tracking-widest uppercase rounded-full border border-rose-gold-dark/50 hover:border-gold-300 transition-all duration-300 relative group box-neon-gold select-none cursor-pointer"
                id="enter-button"
              >
                <span className="absolute inset-0 rounded-full bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                ادخلي عالم ملوكة السحري ✨
                </motion.button>

              
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* B. MAIN COSMOS CONTENT PORTAL */}
      <div className={`transition-all duration-1000 ${isRevealed ? 'blur-0 opacity-100' : 'blur-lg opacity-0'}`} id="main-portal">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4 py-12 z-20 overflow-hidden" id="hero-section">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-wider text-rose-gold mb-6 relative">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            15 يونيو • ليلة اكتمال القمر القمر
          </div>

          <div className="text-center space-y-4 max-w-4xl relative">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white font-semibold leading-none">
              كل سنة وأنتِ أحلى <br />
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] relative inline-block animate-float">
                حاجة في حياتي يا ملوكة ✨
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/70 font-serif italic max-w-lg mx-auto leading-relaxed">
              "البنوتة اللي اسمها لوحده ملاك.. واللي ضحكتها بتنور الدنيا وبتنثر بهجة وسعادة في كل مكان."
            </p>
          </div>

          {/* Interactive Live Countdown Chronometer */}
          <div className="mt-14 scale-95 md:scale-100" style={{ direction: 'ltr' }}>
            <div className="flex gap-4 p-4 border border-rose-gold/15 rounded-2xl glass-panel relative box-neon-gold">
              
              <div className="flex flex-col items-center px-4 py-2 w-16 md:w-20">
                <span className="font-serif text-2xl md:text-3xl font-semibold text-gold-300 tracking-tight">
                  {String(countdown.days).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase mt-1">أيام</span>
              </div>
              <div className="w-[1px] bg-white/10 self-stretch my-2"></div>

              <div className="flex flex-col items-center px-4 py-2 w-16 md:w-20">
                <span className="font-serif text-2xl md:text-3xl font-semibold text-rose-gold-light tracking-tight">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase mt-1">ساعات</span>
              </div>
              <div className="w-[1px] bg-white/10 self-stretch my-2"></div>

              <div className="flex flex-col items-center px-4 py-2 w-16 md:w-20">
                <span className="font-serif text-2xl md:text-3xl font-semibold text-rose-gold-light tracking-tight">
                  {String(countdown.minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase mt-1">دقائق</span>
              </div>
              <div className="w-[1px] bg-white/10 self-stretch my-2"></div>

              <div className="flex flex-col items-center px-4 py-2 w-16 md:w-20">
                <span className="font-serif text-2xl md:text-3xl font-semibold text-neon-pink tracking-tight drop-shadow-[0_0_8px_rgba(255,20,147,0.4)]">
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono text-white/40 tracking-widest uppercase mt-1">ثواني</span>
              </div>

            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-55 hover:opacity-100 transition-opacity">
            <span className="text-[11px] uppercase font-mono tracking-widest text-rose-gold">انزلي وشوفي السحر</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-rose-gold cursor-pointer"
              onClick={() => {
                const section = document.getElementById('gallery-section');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ArrowDown className="w-4 h-4" />
            </motion.div>
          </div>
        </section>

        {/* 3D PHOTO GALLERY / MEMORY LANE */}
        <section className="min-h-screen py-24 flex items-center relative z-20" id="gallery-section">
          <div className="glow-orb w-96 h-96 bg-purple-900/10 top-1/4 left-0"></div>
          <div className="w-full">
            <GalleryCarousel />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-30 mt-4">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer text-white/50 hover:text-white"
              onClick={() => {
                const section = document.getElementById('wish-section');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ArrowDown className="w-4 h-4 mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* GLASSMORPHIC WISH POETRY SECTION */}
        <section className="min-h-screen py-24 flex items-center relative z-20" id="wish-section">
          <div className="glow-orb w-96 h-96 bg-rose-500/5 bottom-1/4 right-0"></div>
          <div className="w-full">
            <WishLetter />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-30 mt-4">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="cursor-pointer text-white/50 hover:text-white"
              onClick={() => {
                const section = document.getElementById('cake-section');
                section?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ArrowDown className="w-4 h-4 mx-auto" />
            </motion.div>
          </div>
        </section>

        {/* INTERACTIVE CAKE VIRTUAL BLESSING ALTAR */}
        <section className="min-h-screen py-24 flex items-center relative z-20" id="cake-section">
          <div className="w-full">
            <VirtualCake />
          </div>
        </section>

        {/* LUXURY LUXE FOOTER */}
        <footer className="py-12 border-t border-white/5 bg-black/40 backdrop-blur-md relative z-20 text-center" id="footer-section">
          <div className="max-w-2xl mx-auto px-4 flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-rose-gold/40"></span>
              <div className="flex gap-1.5 text-gold-300">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Heart className="w-3.5 h-3.5 fill-current text-neon-pink" />
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-rose-gold/40"></span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-lg text-rose-gold-light font-medium tracking-wide">
                كل سنة وأنتِ طيبة يا أحلى ملك في الدنيا
              </h3>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                اتصنع بحب ومن كل قلبي عشانك.. يا رب السنة دي وكل السنين اللي جاية تفضل ضحكتك منورة وعينك ما تشوفش غير الفرحة والنجاح. العمر كله ليكي يا رب في سعادة ورقة.
              </p>
            </div>

            <div className="text-[10px] font-mono text-white/30 tracking-widest uppercase mt-4">
              © حكايات ملوكة وعيد ميلادها الـ ١٨ • ٢٠٢٦
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}