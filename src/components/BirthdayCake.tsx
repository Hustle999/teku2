import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { fireConfetti } from './ConfettiCanvas';

export function BirthdayCake() {
  const [isBlown, setIsBlown] = useState(false);
  const [wished, setWished] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    fireConfetti();
    setTimeout(() => {
      setWished(true);
    }, 400);
  };

  const handleRelight = () => {
    setIsBlown(false);
    setWished(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-amber-50/60 rounded-2xl border border-amber-100/80 shadow-sm max-w-sm mx-auto my-6 text-stone-800">
      <div className="relative mb-4 cursor-pointer group select-none" onClick={handleBlowCandle}>
        {/* Cake Illustration / Interactive Element */}
        <div className="flex flex-col items-center">
          {/* Flame & Wick */}
          <div className="relative h-12 w-8 flex items-end justify-center">
            <AnimatePresence>
              {!isBlown ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [1, 1.1, 0.95, 1.05, 1],
                    y: [0, -1, 1, 0],
                    rotate: [-2, 2, -1, 2, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    ease: 'easeInOut',
                  }}
                  className="absolute bottom-2 flex flex-col items-center"
                >
                  {/* Outer flame */}
                  <div className="h-6 w-3.5 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 shadow-[0_0_12px_rgba(251,191,36,0.8)] filter blur-[0.5px]" />
                  {/* Inner flame core */}
                  <div className="absolute bottom-0 h-3 w-1.5 rounded-full bg-white/90" />
                </motion.div>
              ) : (
                /* Subtle smoke curl when blown */
                <motion.div
                  initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -25, scale: 1.5, x: [-2, 4, -3] }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute bottom-2 h-4 w-1.5 rounded-full bg-stone-400/50 blur-[1px]"
                />
              )}
            </AnimatePresence>
            {/* Candle wick */}
            <div className="h-2 w-0.5 bg-stone-700 rounded-t" />
          </div>

          {/* Candle Body */}
          <div className="h-10 w-4 rounded-t-sm bg-gradient-to-r from-rose-300 via-pink-200 to-rose-300 border-x border-t border-rose-300 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(255,255,255,0.6)_3px,rgba(255,255,255,0.6)_6px)]" />
          </div>

          {/* Cake Top Layer */}
          <div className="h-7 w-28 rounded-t-xl bg-gradient-to-b from-amber-100 to-amber-200/90 border border-amber-300/40 relative shadow-inner">
            {/* Cream drips */}
            <div className="absolute -bottom-1 left-2 w-4 h-2 rounded-full bg-white/90 shadow-xs" />
            <div className="absolute -bottom-1 left-9 w-5 h-3 rounded-full bg-white/90 shadow-xs" />
            <div className="absolute -bottom-1 right-3 w-4 h-2 rounded-full bg-white/90 shadow-xs" />
            {/* Berries on top */}
            <div className="absolute top-1 left-4 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
            <div className="absolute top-1 right-4 w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" />
          </div>

          {/* Cake Base Layer */}
          <div className="h-10 w-36 rounded-b-xl bg-gradient-to-b from-stone-100 via-pink-50 to-amber-100 border-x border-b border-amber-200/80 shadow-md relative flex items-center justify-center">
            <span className="text-[10px] tracking-widest text-rose-400 font-semibold uppercase">
              HAPPY BIRTHDAY
            </span>
          </div>

          {/* Cake Plate */}
          <div className="h-2.5 w-44 rounded-full bg-gradient-to-r from-stone-200 via-white to-stone-200 shadow-sm -mt-0.5 border border-stone-300/60" />
        </div>
      </div>

      <div className="text-center">
        {!isBlown ? (
          <button
            onClick={handleBlowCandle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-stone-700 text-xs font-medium border border-rose-200/70 shadow-xs hover:shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin" />
            Хүслээ шивнээд лаагаа үлээгээрэй 🎂
          </button>
        ) : (
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-serif text-rose-800 font-medium flex items-center justify-center gap-1.5"
            >
              <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              <span>Шивнэсэн бүх хүсэл чинь биелэх болтугай! ✨</span>
            </motion.div>
            <button
              onClick={handleRelight}
              className="text-[11px] text-stone-400 hover:text-stone-600 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Лааг дахин асаах
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
