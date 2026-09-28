import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LockScreenProps {
  onUnlock: () => void;
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [wrongAttemptCount, setWrongAttemptCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    if (password === 'Teku@247') {
      setWarningMessage(null);
      onUnlock();
    } else {
      const nextCount = wrongAttemptCount + 1;
      setWrongAttemptCount(nextCount);

      // 1st wrong attempt -> "You know it, think again"
      // 2nd wrong attempt -> "try it or leave"
      // Alternating back and forth
      const nextMessage =
        nextCount % 2 === 1
          ? 'You know it, think again'
          : 'try it or leave';

      setWarningMessage(nextMessage);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white px-4 selection:bg-rose-500 selection:text-white">
      {/* Subtle deep ambient glow behind input */}
      <div className="absolute w-96 h-96 rounded-full bg-rose-950/10 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10 text-center"
      >
        {/* Mysterious minimal lock symbol with subtle pulse */}
        <div className="mx-auto mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400">
          <Lock className="h-4 w-4" />
        </div>

        {/* Minimal question: "what's my password" */}
        <h1
          className="text-2xl sm:text-3xl font-light tracking-wide text-neutral-200 mb-8 lowercase select-none"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          what's my password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            animate={isShaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative flex items-center"
          >
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950/80 px-4 py-3.5 pr-20 text-center text-sm font-medium tracking-widest text-white placeholder-neutral-700 outline-none transition-all duration-300 focus:border-neutral-500 focus:bg-neutral-900 focus:ring-1 focus:ring-neutral-500"
            />

            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="p-1.5 text-neutral-500 hover:text-neutral-300 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900 hover:bg-white hover:scale-105 active:scale-95 transition-all"
                title="Submit"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          {/* Alternating warning message */}
          <div className="h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {warningMessage && (
                <motion.p
                  key={warningMessage + wrongAttemptCount}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs font-mono tracking-wider text-rose-400"
                >
                  {warningMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>

        <p className="mt-8 text-[11px] tracking-widest uppercase text-neutral-700 select-none">
          A secret waiting just for you
        </p>
      </motion.div>
    </div>
  );
}
