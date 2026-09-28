import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LockScreen } from './components/LockScreen';
import { InteractiveSurprise } from './components/InteractiveSurprise';
import { PetalCanvas } from './components/PetalCanvas';
import { ConfettiCanvas } from './components/ConfettiCanvas';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden font-sans">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="lock-screen"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              filter: 'brightness(2)',
              transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-50 bg-black"
          >
            <LockScreen onUnlock={() => setIsUnlocked(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="surprise-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-screen w-full relative"
          >
            {/* Soft floating rose & peach petals canvas */}
            <PetalCanvas />

            {/* Confetti celebration canvas */}
            <ConfettiCanvas />

            {/* Main Interactive Surprise Experience */}
            <InteractiveSurprise onLockAgain={() => setIsUnlocked(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
