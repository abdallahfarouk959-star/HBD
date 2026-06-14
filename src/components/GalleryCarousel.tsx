import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles, Calendar } from 'lucide-react';

// استيراد الصور بشكل صريح من الـ assets
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';

const INITIAL_MEMORIES = [
  {
    id: 1,
    title: "ملاكي الصافي والجميل 🌸",
    description: "البنوتة الرقيقة اللي اسمها لوحده بيفسر معناه.. حتة ملاك من السما منورة دنيتنا وحياتنا دايماً.",
    date: "حكاية أول ليلة",
    glowColor: "rgba(236, 192, 188, 0.4)", 
    imageSrc: img1
  },
  {
    id: 2,
    title: "أحلام ملوكة الطايرة في السما ✨",
    description: "افردي جناحك بكل ثقة يا ملوكة، الدنيا كلها مستنياكي تحقق كل طموحاتك والـ ١٨ بداية العظمة.",
    date: "طموحات بكرة الحلو",
    glowColor: "rgba(253, 224, 71, 0.4)",
    imageSrc: img2
  },
  {
    id: 3,
    title: "الوردة اللي بتنور ليلنا 🌹",
    description: "زي الوردة النادرة اللي بتفتح تحت ضوء القمر.. رقيقة، هادية، وجواها قوة طيبة وحنينة تهز الكون.",
    date: "أرق وأحلى الليالي",
    glowColor: "rgba(244, 63, 94, 0.4)",
    imageSrc: img3
  },
  {
    id: 4,
    title: "تاج من النجوم على رأس الأميرة 👑",
    description: "البسي تاجك وافرحي النهاردة.. إنتِ أميرة ليلتك وعيد ميلادك الـ ١٨، وتستاهلي كل حاجة حلوة في المجرة.",
    date: "قمر منور في الفضا",
    glowColor: "rgba(168, 85, 247, 0.4)",
    imageSrc: img4
  },
  {
    id: 5,
    title: "ضحكة من القلب بتدوب الزعل ❤️",
    description: "قلبك زي البحر الصافي، كله أحلام، ذكريات، ونور دافي بيسعد كل اللي حواليكي دايماً.",
    date: "صفاء وجمال الروح",
    glowColor: "rgba(0, 240, 255, 0.4)",
    imageSrc: img5
  },
  {
    id: 6,
    title: "رحلة الـ ١٨ سنة عسل ودلع 🎂",
    description: "كل خطوة بتمشيها بتعمل لحن في قلبنا.. ملوكتي الغالية اللي بتخلي الدنيا مكان مبهج وسعيد ولطيف.",
    date: "سنة جديدة من السحر",
    glowColor: "rgba(236, 72, 153, 0.4)",
    imageSrc: img6
  }
];

export default function GalleryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [, setHoveredCard] = useState<number | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % INITIAL_MEMORIES.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + INITIAL_MEMORIES.length) % INITIAL_MEMORIES.length);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    const px = x / (box.width / 2);
    const py = y / (box.height / 2);

    card.style.setProperty('--rx', `${-py * 15}deg`);
    card.style.setProperty('--ry', `${px * 15}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center mb-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-gold/10 border border-rose-gold/20 text-xs text-rose-gold mb-4 uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-gold-300 animate-spin-slow" />
          معرض حكايات ملوكة وعيد ميلادها 📸
        </div>
        <h2 className="font-serif text-3xl md:text-4xl text-rose-gold-light tracking-wide mb-2">
          ألبوم ذكريات ملك الساحر ❤️
        </h2>
        <p className="text-sm text-white/50 leading-relaxed">
          حركي الماوس أو الموبايل فوق الكروت عشان تحسي بالعمق والـ 3D الجميل.. دي صور أحلى لحظات وحكايات الـ ١٨ سنة عظمة!
        </p>
      </div>

      {/* 3D Showcase Area */}
      <div className="relative w-full min-h-[500px] flex items-center justify-center overflow-x-hidden md:overflow-visible">
        
        {/* Navigation Buttons */}
        <div className="absolute left-2 md:-left-12 z-40">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-rose-gold/20 bg-magic-deep/85 text-rose-gold hover:text-white hover:bg-rose-gold/25 flex items-center justify-center transition-all shadow-lg cursor-pointer"
            aria-label="Previous Memory"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute right-2 md:-right-12 z-40">
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-rose-gold/20 bg-magic-deep/85 text-rose-gold hover:text-white hover:bg-rose-gold/25 flex items-center justify-center transition-all shadow-lg cursor-pointer"
            aria-label="Next Memory"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Stack Container */}
        <div className="relative w-[310px] h-[450px] md:w-[350px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {INITIAL_MEMORIES.map((card, index) => {
              let offset = index - activeIndex;
              
              if (offset < -INITIAL_MEMORIES.length / 2) {
                offset += INITIAL_MEMORIES.length;
              } else if (offset > INITIAL_MEMORIES.length / 2) {
                offset -= INITIAL_MEMORIES.length;
              }

              const isVisible = Math.abs(offset) <= 2;
              if (!isVisible) return null;

              const isCenter = offset === 0;
              const rotationYAngle = offset * 24; 
              const translateZ = -Math.abs(offset) * 110; 
              const translateX = offset * 180; 
              const rotateZ = offset * 5; 

              return (
                <motion.div
                  key={card.id}
                  className="absolute preserve-3d"
                  style={{
                    zIndex: 10 - Math.abs(offset),
                    transformStyle: 'preserve-3d',
                  }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{
                    opacity: 1,
                    scale: isCenter ? 1 : 0.88 - Math.abs(offset) * 0.08,
                    x: translateX,
                    z: translateZ,
                    rotateY: rotationYAngle,
                    rotateZ: rotateZ,
                  }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 18,
                  }}
                >
                  {/* Polaroid Frame Container */}
                  <div
                    onMouseMove={(e) => isCenter && handleMouseMove(e)}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={(e) => {
                      setHoveredCard(null);
                      handleMouseLeave(e);
                    }}
                    className="polaroid-frame p-4 pb-6 w-[290px] md:w-[325px] h-[430px] rounded-lg transition-all duration-300 relative flex flex-col justify-between text-right"
                    style={{
                      transform: isCenter ? 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))' : undefined,
                      boxShadow: isCenter
                        ? `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px ${card.glowColor}`
                        : '0 10px 20px rgba(0,0,0,0.4)',
                    }}
                  >
                    {/* غلاف الصورة الذكي - المصلح لمنع القص التام */}
                    <div className="w-full h-56 bg-slate-950/90 rounded overflow-hidden mb-4 relative group flex items-center justify-center">
                      
                      {/* 1. صورة الخلفية المموهة لملء الفراغات الطولية بشكل سينمائي */}
                      <img 
                        src={card.imageSrc} 
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-40 scale-110 pointer-events-none"
                      />

                      {/* 2. الصورة الأمامية الأساسية - كاملة ومضبوطة وبدون أي قص */}
                      <img 
                        src={card.imageSrc} 
                        alt={card.title} 
                        className="max-w-full max-h-full object-contain z-10 transition-transform duration-500 group-hover:scale-102"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-20"></div>
                    </div>

                    {/* Metadata Date */}
                    <div className="flex flex-row-reverse items-center gap-1.5 text-[10px] text-rose-gold/60 uppercase tracking-widest mb-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      <span>{card.date}</span>
                    </div>

                    {/* Polaroid Text Body */}
                    <h3 className="font-serif font-semibold text-base text-rose-gold-light leading-tight mb-2 tracking-wide">
                      {card.title}
                    </h3>

                    <p className="text-[11px] text-white/60 leading-relaxed font-extralight line-clamp-3">
                      {card.description}
                    </p>

                    <div className="absolute bottom-2 left-4 text-[10px] text-gold-300 font-serif font-bold opacity-60">
                      ملوكة قلبي ♥
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-4 z-20">
        {INITIAL_MEMORIES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === i
                ? 'bg-rose-gold w-5 shadow-[0_0_8px_rgba(236,192,188,0.7)]'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}