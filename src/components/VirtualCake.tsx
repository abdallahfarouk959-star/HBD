import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Flame, Sparkles, Send, RefreshCw, Star } from 'lucide-react';

interface BlessingCandle {
  id: number;
  name: string;
  color: string;
  flameColor: string;
  isLit: boolean;
  meaning: string;
}

export default function VirtualCake() {
  const [candles, setCandles] = useState<BlessingCandle[]>([
    { id: 1, name: "الأحلام طموحة", color: "bg-amber-400", flameColor: "rgba(251, 191, 36, 0.8)", isLit: true, meaning: "عشان تحققي كل اللي نفسك فيه وتوصلي لأعلى المراكز في دراستك وحياتك." },
    { id: 2, name: "الحب والـحنية", color: "bg-rose-400", flameColor: "rgba(244, 63, 94, 0.8)", isLit: true, meaning: "تملى دنيتك بصحاب مخلصين، وناس تحبك بجد وتحميكي دايماً." },
    { id: 3, name: "الراحة والهدوء", color: "bg-purple-400", flameColor: "rgba(168, 85, 247, 0.8)", isLit: true, meaning: "تخلي بالك دايماً رايق وقلبك صافي ومطمن في كل خطوة." },
    { id: 4, name: "الصحة والـطاقة", color: "bg-cyan-400", flameColor: "rgba(6, 182, 212, 0.8)", isLit: true, meaning: "تفضل ضحكتك منورة ووشك منور وصحتك بمب وعال العال." },
    { id: 5, name: "الحظ والسعادة", color: "bg-rose-gold-dark", flameColor: "rgba(236, 192, 188, 0.8)", isLit: true, meaning: "تجبلك مفاجآت حلوة ومعجزات من حيث لا تحتسبي تغير دنيتك للفرحة." },
  ]);

  const [smokeActive, setSmokeActive] = useState<number | null>(null);
  const [isCelebrationActive, setIsCelebrationActive] = useState(false);
  const [secretWish, setSecretWish] = useState("");
  const [wishSent, setWishSent] = useState(false);

  const litCount = candles.filter(c => c.isLit).length;
  const allExtinguished = litCount === 0;

  useEffect(() => {
    if (allExtinguished && !isCelebrationActive) {
      setIsCelebrationActive(true);
      triggerCelebration();
    }
  }, [allExtinguished]);

  const triggerCelebration = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 45 * (timeLeft / duration);
      const colors = ['#ecc0bc', '#fde047', '#ff1493', '#00f0ff', '#bd00ff'];

      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors });
    }, 250);
  };

  const handleExtinguish = (id: number) => {
    setCandles(prev => prev.map(c => (c.id === id ? { ...c, isLit: false } : c)));
    setSmokeActive(id);
    setTimeout(() => setSmokeActive(null), 1200);

    confetti({ particleCount: 15, spread: 40, origin: { y: 0.6 }, colors: ['#ecc0bc', '#fde047'] });
  };

  const resetCandles = () => {
    setCandles(prev => prev.map(c => ({ ...c, isLit: true })));
    setIsCelebrationActive(false);
    setWishSent(false);
    setSecretWish("");
  };

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretWish.trim()) return;

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#fde047', '#fef08a', '#ecc0bc'],
    });
    setWishSent(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
      
      <div className="text-center mb-8 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-400/10 border border-rose-400/20 text-xs text-rose-400 mb-4 uppercase tracking-widest font-mono">
          <Flame className="w-3.5 h-3.5 animate-pulse text-neon-pink" />
          طقوس تمني الأمنية 🎂
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-rose-gold-light tracking-wide mb-2">
          اتمني أمنية يا ملوكة ❤️
        </h2>
        <p className="text-sm text-white/50 leading-relaxed">
          {allExtinguished 
            ? "كل الأمنيات والدعوات فتحت! اكتبي أمنيتك السرية تحت عشان نبعتها للسما ✨" 
            : `دوسي على كل شمعة من شمع البركة والجميل ده عشان تطفيه.. كل شمعة شايلة دعوة مخصوصة ليكي. (فاضل ${litCount} منورين)`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-20">
        
        {/* Left Hand: Cake */}
        <div className="flex flex-col items-center justify-center relative min-h-[350px]">
          <div className="absolute w-64 h-64 bg-rose-gold/5 rounded-full filter blur-3xl -z-10 animate-pulse"></div>

          {/* Candles layout */}
          <div className="relative flex justify-center gap-4 h-24 mb-[-8px] w-full z-20 max-w-[280px]">
            {candles.map((candle, idx) => {
              const yOffset = Math.abs(idx - 2) * 5; 
              return (
                <div
                  key={candle.id}
                  className="flex flex-col items-center justify-end relative select-none cursor-pointer"
                  style={{ transform: `translateY(${yOffset}px)` }}
                  onClick={() => candle.isLit && handleExtinguish(candle.id)}
                >
                  <AnimatePresence>
                    {candle.isLit ? (
                      <motion.div
                        className="absolute bottom-11 flex flex-col items-center"
                        initial={{ scale: 0, y: 10 }}
                        animate={{ scale: [1, 1.05, 0.95, 1], y: 0 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <div
                          className="w-4 h-6 rounded-b-full rounded-tl-full rotate-[40deg] filter blur-[1px] animate-pulse"
                          style={{
                            background: `radial-gradient(ellipse at bottom, #ff5e00 20%, ${candle.flameColor} 100%)`,
                            boxShadow: `0 0 12px 2px ${candle.flameColor}`,
                          }}
                        />
                        <div className="w-1.5 h-2.5 rounded-full bg-yellow-200 absolute bottom-1 blur-[0.2px] opacity-80" />
                      </motion.div>
                    ) : (
                      smokeActive === candle.id && (
                        <motion.div
                          className="absolute bottom-11 text-white/30 text-xs font-serif font-extralight pointer-events-none select-none flex flex-col items-center"
                          initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                          animate={{ opacity: [0.8, 0], y: -30, scale: [0.6, 1.4], x: [0, -6, 6, 0] }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                          ☁
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>

                  <div className="w-[1.5px] h-3 bg-neutral-600 rounded-t " />
                  <div className={`w-3 h-11 rounded-t-sm shadow-md flex flex-col items-center justify-between relative overflow-hidden ${candle.color} ${candle.isLit ? 'brightness-100' : 'brightness-50'}`}>
                    <div className="absolute inset-0 bg-repeating-linear-gradient opacity-30 bg-[linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.4)_4px,rgba(255,255,255,0.4)_8px)]"></div>
                  </div>
                  <div className="w-4 h-1 bg-white/20 blur-[0.5px] rounded-full -mt-[1px]" />
                </div>
              );
            })}
          </div>

          {/* Luxury 3-Layer Birthday Cake Vector */}
          <div className="w-[280px] md:w-[325px] flex flex-col items-center relative z-10 select-none">
            <div className="w-[180px] h-[40px] bg-gradient-to-b from-rose-950 to-magic-deep rounded-t-lg relative border-b border-rose-gold/15 flex items-center justify-center">
              <div className="absolute top-0 inset-x-0 h-2.5 bg-rose-gold/20 rounded-t-lg filter blur-[0.5px]"></div>
              <div className="absolute -bottom-1 inset-x-0 h-2 bg-gradient-to-r from-rose-400/20 via-pink-400/5 to-rose-400/20 rounded-full"></div>
              <div className="flex gap-4">
                <Star className="w-2.5 h-2.5 text-gold-300 fill-gold-400 opacity-60" />
                <Star className="w-2.5 h-2.5 text-gold-300 fill-gold-400 opacity-60" />
              </div>
            </div>

            <div className="w-[230px] h-[55px] bg-gradient-to-b from-magic-purple to-slate-950 border-t border-white/5 relative border-b border-rose-gold/15 flex items-center justify-between px-6">
              <div className="absolute -top-1.5 inset-x-2 flex justify-between px-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-4 h-3 bg-gradient-to-t from-rose-gold-light to-white rounded-full shadow-inner"></div>
                ))}
              </div>
              <Star className="w-3 h-3 text-gold-300 fill-gold-400 opacity-40" />
              <span className="font-serif italic text-sm text-rose-gold tracking-widest uppercase">Malak ✨</span>
              <Star className="w-3 h-3 text-gold-300 fill-gold-400 opacity-40" />
            </div>

            <div className="w-[280px] h-[75px] bg-gradient-to-b from-magic-deep via-magic-dark to-black border-t border-white/5 relative rounded-b-lg shadow-2xl flex items-center justify-center">
              <div className="absolute -top-1.5 inset-x-2 flex justify-between px-1">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-4 h-3 bg-gradient-to-t from-rose-gold-light to-white rounded-full shadow-inner"></div>
                ))}
              </div>
              <div className="absolute inset-x-4 top-4 flex justify-around opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-300" />
                <div className="w-1 h-1.5 rotate-45 bg-rose-gold" />
                <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                <div className="w-1 h-1 rotate-12 bg-cyan-400" />
              </div>
              <div className="px-4 py-1 border border-rose-gold/25 rounded bg-magic-dark/95 box-neon-gold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-300 fill-gold-300/10" />
                <span className="font-serif text-gold-300 text-[11px] uppercase tracking-wider">تورته الـ ١٨ سنة لملوكة</span>
              </div>
            </div>

            <div className="w-[300px] h-3 bg-gradient-to-r from-neutral-800 via-rose-gold/50 to-neutral-800 rounded-full border border-white/10 mt-1 shadow-lg"></div>
            <div className="w-[140px] h-6 bg-gradient-to-b from-neutral-800 to-black/60 rounded-b-xl border-t-0 border border-white/5 shadow-inner"></div>
          </div>
        </div>

        {/* Right Hand: Control Panel */}
        <div className="flex flex-col justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            {!allExtinguished ? (
              <motion.div
                key="blessings-panel"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel rounded-xl p-5 md:p-6 border border-rose-gold/15 text-right"
              >
                <div className="font-mono text-[11px] text-rose-gold uppercase tracking-widest mb-3 border-b border-rose-gold/10 pb-2 flex items-center justify-between">
                  <span>منورين لملك: {litCount}</span>
                  <span>مذبح أماني الشموع 🌟</span>
                </div>

                <div className="space-y-4">
                  {candles.map((candle) => (
                    <div
                      key={candle.id}
                      onClick={() => candle.isLit && handleExtinguish(candle.id)}
                      className={`group p-3 rounded-lg border flex flex-row-reverse items-center gap-3 transition-all duration-300 cursor-pointer ${
                        candle.isLit
                          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-rose-gold/40'
                          : 'bg-black/30 border-white/5 opacity-55 saturate-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        candle.isLit ? `${candle.color}/15 text-gold-300` : 'bg-neutral-800 text-neutral-500'
                      }`}>
                        {candle.isLit ? (
                          <Flame className="w-4 h-4 text-orange-400 group-hover:scale-110" />
                        ) : (
                          <span className="text-xs font-mono">✓</span>
                        )}
                      </div>

                      <div className="flex-1 text-right">
                        <h4 className={`text-xs font-semibold tracking-wider ${candle.isLit ? 'text-rose-gold-light' : 'text-white/30 line-through'}`}>
                          شمعة {candle.name}
                        </h4>
                        <p className={`text-[11px] font-light leading-snug mt-0.5 ${candle.isLit ? 'text-white/60' : 'text-white/20'}`}>
                          {candle.meaning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="wish-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-panel rounded-xl p-6 border-gold-300/30 ring-1 ring-gold-300/20 shadow-neon-gold text-center"
              >
                <div className="font-serif mb-5">
                  <span className="text-gold-300 font-mono text-[10px] tracking-widest uppercase block mb-1">
                    ★★ بوابة النجوم والأمنيات انفتحت ليكي ★★
                  </span>
                  <h3 className="text-lg md:text-xl font-medium text-rose-gold-light">
                    الكون كله بيسمعك دلوقتي يا ملوكة..
                  </h3>
                </div>

                {!wishSent ? (
                  <form onSubmit={handleSendWish} className="space-y-4">
                    <p className="text-xs leading-relaxed text-white/70 font-extralight mb-2">
                      كل شمع عيد ميلادك الـ ١٨ اطفى بحب، اكتبي أمنيتك السرية والسحرية هنا.. وهتتحول لغبار نجوم يطير في الفضا ويتحقق قريب بإذن الله!
                    </p>

                    <div className="relative">
                      <textarea
                        value={secretWish}
                        onChange={(e) => setSecretWish(e.target.value)}
                        placeholder="اكتبي أمنيتك يا ملوكة قلبي هنا..."
                        className="w-full h-24 bg-black/45 rounded-lg border border-rose-gold/15 p-3 text-xs text-white text-right placeholder-white/30 focus:outline-none focus:border-gold-300 focus:ring-1 focus:ring-gold-300/30 transition-all font-light resize-none"
                        maxLength={180}
                        style={{ direction: 'rtl' }}
                      />
                      <span className="absolute bottom-2.5 left-2 text-[9px] text-white/30 font-mono">
                        {secretWish.length}/180
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={!secretWish.trim()}
                      className={`w-full py-2 px-4 rounded-md border text-xs font-mono tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                        secretWish.trim()
                          ? 'bg-gradient-to-r from-gold-500/20 to-amber-600/20 border-gold-300 text-gold-300 hover:bg-gold-500/30 hover:shadow-neon-gold cursor-pointer'
                          : 'bg-white/5 border-white/5 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      أطلقي الأمنية للنجوم ✨
                    </button>
                  </form>
                ) : (
                  <motion.div className="text-center py-6" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="w-14 h-14 bg-gold-300/10 rounded-full flex items-center justify-center mx-auto text-gold-300 mb-4 animate-bounce">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-lg text-gold-300 tracking-wide mb-1 font-medium">
                      الأمنية طارت للسما بنجاح! 🌌
                    </h4>
                    <p className="text-xs leading-relaxed text-white/60 font-light max-w-xs mx-auto mb-6">
                      كلامك ودعواتك اتحولت لطاقة جميلة وسحرية وسط النجوم.. يا رب تفرحي بتحقيقها قريب جداً يا أحلى وأجمل ملاك.
                    </p>
                    <button
                      onClick={resetCandles}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[10px] uppercase font-mono tracking-wider text-rose-gold border border-white/10 transition-all"
                    >
                      <RefreshCw className="w-3 h-3" />
                      ولعي الشمع تاني عشان نفرح
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}