import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Sparkles, Heart, Quote } from 'lucide-react';

const WISH_CATEGORIES = [
  {
    id: 'angelic',
    tabName: 'جواب لملوكة 💌',
    title: 'رسمياً.. ملوكتي بقت ١٨ سنة! 🎂',
    poem: [
      "يا ملوكة.. النهاردة مش مجرد يوم عادي في السنة،",
      "النهاردة عيد ميلاد أحلى بنوتة كبرت وبقت زي القمر.",
      "١٨ سنة من الرقة، من الطيبة، ومن الضحكة اللي بتنور الدنيا،",
      "كبرتي وبقيتي شابة جميلة، بس لسه في عيني الملاك اللي مفيش منه اتنين.",
      "ربنا يحميكي ويسعد قلبك الصافي دايماً يا رب،",
      "وتفضلي دايماً غالية ومنورة حياتنا بوجودك الجميل فيها.",
      "كل سنة وأنتِ طيبة، وكل سنة وأنتِ منورة الدنيا كلها بأثرك الطيب! ♥️"
    ],
    closing: "العمر كله ليكي يا رب في وسط فرحة ونجاح.",
  },
  {
    id: 'horizon',
    tabName: 'أمنيات للمستقبل ✨',
    title: 'بداية مرحلة جديدة تليق بيكي 👑',
    poem: [
      "أنتِ النهاردة واقفة على أول طريق مرحلة جديدة تماماً،",
      "مرحلة الـ ١٨ سنة، السن اللي هتحققي فيه كل أحلامك الكبيرة.",
      "سيبي أي زعل ورا ضهرك، وافتحي قلبك لليام الجاية كلها،",
      "لأنها مستنياكي بالفرحة، بالنجاح، وبالحاجات الحلوة اللي تشبهك.",
      "أنتِ قوية ورقيقة، وتستاهلي تكتبي أجمل قصة ليكي،",
      "وإن شاء الله أشوفك دايماً في أعلى الأماكن ومبسوطة.",
      "عيشي كل لحظة، وكوني دايماً واثقة إن النجوم بتلمع عشانك! 🌟"
    ],
    closing: "يا رب كل خطوة جاية ليكي تكون مليانة توفيق وسعادة.",
  },
  {
    id: 'wisdom',
    tabName: 'كلام من القلب ❤️',
    title: 'إلى صاحبة أرق وأحن قلب 🌸',
    poem: [
      "العمر مش مجرد سنين بتعدي وبنحسبها بالأرقام،",
      "العمر الحقيقي هو القلوب اللي بنفرحها والذكريات الحلوة.",
      "وأنتِ من يوم ما جيتي الدنيا وأنتِ بتمليها بهجة وحنية.",
      "قلبك ده دهب صافي، وجواكي نقاء نادر مش موجود في حد تاني.",
      "ملوكة.. يا رب السنين الجاية كلها تكون صحة وراحة بال،",
      "وتفضلي دايماً البنوتة المبهجة اللي بتخطف القلوب برقتها.",
      "كل سنة وأنتِ أبهى وأجمل، وكل سنة وأنتِ غالية جداً! 💕"
    ],
    closing: "حاجة مخصوصة ومعمولة من القلب لأجمل بنوتة في الكون.",
  }
];

export default function WishLetter() {
  const [activeTab, setActiveTab] = useState('angelic');
  const selectedWish = WISH_CATEGORIES.find(w => w.id === activeTab) || WISH_CATEGORIES[0];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 relative">
      <div className="absolute top-10 right-10 w-44 h-44 bg-neon-pink/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-44 h-44 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Glassmorphic Tabs Selection */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 z-20 position-relative">
        {WISH_CATEGORIES.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-rose-gold-dark/40 to-fuchsia-950/40 text-rose-gold border border-rose-gold-dark/60 shadow-[0_0_15px_rgba(236,192,188,0.25)]'
                : 'bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10 border border-white/5'
            }`}
          >
            {tab.tabName}
          </button>
        ))}
      </div>

      {/* Main Glassmorphic Card */}
      <motion.div
        layout
        className="glass-panel rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-2xl z-10"
        style={{
          boxShadow: '0 25px 50px -12px rgba(8, 4, 20, 0.7), 0 0 25px rgba(236,192,188,0.06)'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-gold/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold-300/40 to-transparent"></div>

        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-rose-gold/20 flex items-center justify-center rotate-45 select-none opacity-30 pointer-events-none">
          <div className="w-20 h-20 rounded-full border border-dashed border-rose-gold/10 flex items-center justify-center">
            <span className="font-serif italic text-xs text-rose-gold">MALAK</span>
          </div>
        </div>

        {/* Wish Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-rose-gold/10 flex items-center justify-center text-rose-gold">
            <Quote className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono tracking-widest text-gold-300 uppercase">رسالة من الروح للروح</div>
            <h3 className="font-serif text-xl md:text-2xl text-rose-gold-light tracking-wide font-medium">
              {selectedWish.title}
            </h3>
          </div>
        </div>

        {/* Card Content - The Poem */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col space-y-3.5 pr-3 border-r border-rose-gold/15"
            >
              {selectedWish.poem.map((line, idx) => (
                <p
                  key={idx}
                  className={`font-serif italic text-sm md:text-base text-white/90 leading-relaxed tracking-wider text-right ${
                    idx % 2 !== 0 ? 'pr-4 text-rose-gold-light/95' : ''
                  }`}
                >
                  {line}
                </p>
              ))}

              {/* Glowing Signature Ending */}
              <div className="pt-6 mt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="italic text-xs text-white/40">
                  — {selectedWish.closing}
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono tracking-widest text-rose-gold/80 bg-rose-gold/5 px-2.5 py-1 rounded-md border border-rose-gold/10 uppercase">
                    كل سنة وأنتِ طيبة يا غالية ✨
                  </span>
                  <Heart className="w-4 h-4 text-neon-pink fill-neon-pink/20 animate-pulse" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 right-6 opacity-5 z-0">
          <Sparkles className="w-20 h-20 text-gold-300" />
        </div>
      </motion.div>
    </div>
  );
}