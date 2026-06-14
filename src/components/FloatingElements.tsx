import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface FloatingObject {
  id: number;
  type: 'balloon' | 'heart' | 'star';
  colorClass: string;
  glowClass: string;
  left: number;
  scale: number;
  delay: number;
  duration: number;
  horizontalRange: number;
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingObject[]>([]);

  useEffect(() => {
    // Generate organic floating items
    const types: ('balloon' | 'heart' | 'star')[] = ['balloon', 'heart', 'star', 'balloon', 'heart'];
    const balloonsGradients = [
      'from-rose-400/30 to-rose-gold-dark/40', // Rose gold
      'from-amber-300/30 to-gold-500/40',       // Champagne gold
      'from-fuchsia-500/30 to-pink-600/40',    // Neon pink
      'from-purple-500/30 to-violet-950/40',   // Mystic purple
    ];
    const glows = [
      'shadow-neon-pink',
      'shadow-neon-gold',
      'shadow-neon-purple',
    ];

    const generated: FloatingObject[] = Array.from({ length: 15 }).map((_, i) => {
      const type = types[i % types.length];
      const left = Math.random() * 90 + 5; // keep inside screen bounds 5%-95%
      const scale = Math.random() * 0.6 + 0.6; // 0.6 - 1.2
      const delay = Math.random() * 10;
      const duration = Math.random() * 15 + 20; // 20s - 35s speed
      const horizontalRange = Math.random() * 50 + 20; // wiggle range

      let colorClass = '';
      if (type === 'balloon') {
        colorClass = balloonsGradients[i % balloonsGradients.length];
      } else if (type === 'heart') {
        colorClass = i % 2 === 0 ? 'text-neon-pink' : 'text-rose-gold';
      } else {
        colorClass = 'text-gold-300';
      }

      return {
        id: i,
        type,
        colorClass,
        glowClass: glows[i % glows.length],
        left,
        scale,
        delay,
        duration,
        horizontalRange,
      };
    });

    setElements(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {elements.map((el) => {
        // Balloon rendering
        if (el.type === 'balloon') {
          return (
            <motion.div
              key={el.id}
              className={`absolute bottom-0 flex flex-col items-center`}
              style={{ left: `${el.left}%` }}
              initial={{ y: '105vh', opacity: 0, scale: el.scale }}
              animate={{
                y: '-25vh',
                opacity: [0, 0.8, 0.8, 0],
                x: [0, el.horizontalRange, -el.horizontalRange, 0],
              }}
              transition={{
                duration: el.duration,
                delay: el.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Balloon Body */}
              <div
                className={`w-14 h-18 rounded-t-full rounded-b-[40px] bg-gradient-to-tr ${el.colorClass} border border-white/10 backdrop-blur-[2px] shadow-[inset_0_4px_10px_rgba(255,255,255,0.2)] flex items-center justify-center relative`}
              >
                {/* Shiny Specular Highlight */}
                <div className="absolute top-2 left-3 w-3 h-5 rounded-full bg-white/20 rotate-12 blur-[1px]"></div>
                
                {/* Subtle soft heart or star overlay on balloon */}
                <span className="text-[10px] text-white/20 select-none font-serif">M</span>
                
                {/* Balloon Tie Knot */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2 bg-inherit rounded-sm"></div>
              </div>
              
              {/* Balloon String */}
              <svg className="w-1 h-14 overflow-visible -mt-1 opacity-40" viewBox="0 0 10 100">
                <path
                  d="M5,0 Q0,25 5,50 T5,100"
                  fill="none"
                  stroke="#ecc0bc"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>
          );
        }

        // Heart rendering
        if (el.type === 'heart') {
          return (
            <motion.div
              key={el.id}
              className={`absolute text-xl ${el.colorClass} drop-shadow-[0_0_8px_rgba(255,20,147,0.3)] filter`}
              style={{ left: `${el.left}%` }}
              initial={{ y: '105vh', opacity: 0, scale: el.scale * 0.8 }}
              animate={{
                y: '-20vh',
                opacity: [0, 0.9, 0.9, 0],
                x: [-el.horizontalRange * 0.5, el.horizontalRange * 0.5, -el.horizontalRange * 0.5],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: el.duration - 2,
                delay: el.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              ♥
            </motion.div>
          );
        }

        // Sparkle / Gold Star rendering
        return (
          <motion.div
            key={el.id}
            className={`absolute text-md ${el.colorClass} opacity-60`}
            style={{ left: `${el.left}%` }}
            initial={{ y: '105vh', opacity: 0, scale: el.scale * 0.6 }}
            animate={{
              y: '-20vh',
              opacity: [0, 1, 1, 0],
              x: [0, -el.horizontalRange * 0.3, el.horizontalRange * 0.3, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: el.duration + 5,
              delay: el.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            ✦
          </motion.div>
        );
      })}
    </div>
  );
}
