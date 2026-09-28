import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Volume2, VolumeX, Edit3, Lock, Sparkles, RefreshCw, Stamp } from 'lucide-react';
import { fireConfetti } from './ConfettiCanvas';
import { musicBox } from '../utils/audio';
import { BirthdayCake } from './BirthdayCake';
import { LetterEditorModal } from './LetterEditorModal';

interface InteractiveSurpriseProps {
  onLockAgain: () => void;
}

const DEFAULT_LETTER_TITLE = 'Миний хамгийн нандин, эрхэм хүндээ... 🌸';

const DEFAULT_LETTER_BODY = `Төрсөн өдрийн халуун баярын мэндийг чин сэтгэлээсээ хүргэе!

Энэ ертөнцөд чи минь мэндэлж, миний амьдралд хамгийн дулаахан, хамгийн нандин гэрэл гэгээ болж ирсэнд үргэлж талархдаг. Чиний инээмсэглэл, эелдэг зөөлөн харц, хайр татам зан чанар бүхэн энэ хорвоог улам илүү өнгөлөг, утга учиртай болгодог шүү.

Энэ шинэ нас чинь чамд дуусашгүй их баяр баясгалан, инээд хөөр, хүсэл мөрөөдөл бүхний чинь биелэл, эрүүл энх, амжилт бүтээлийг авчрах болтугай.

Чи бол миний хувьд хамгийн онцгой, дахин давтагдашгүй нэгэн. Үргэлж өөрийнхөөрөө гэрэлтэж, амьдралын хором мөч бүрээс аз жаргалыг мэдэрч яваарай.

Төрсөн өдрийн баяр хүргэе, хайрт минь! ❤️`;

const DEFAULT_LETTER_SENDER = 'Үргэлж чамайг хайрлаж, дэргэд чинь байх хүнээс...';

export function InteractiveSurprise({ onLockAgain }: InteractiveSurpriseProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Letter content saved in localStorage
  const [letterTitle, setLetterTitle] = useState(() => {
    return localStorage.getItem('surprise_letter_title') || DEFAULT_LETTER_TITLE;
  });
  const [letterBody, setLetterBody] = useState(() => {
    return localStorage.getItem('surprise_letter_body') || DEFAULT_LETTER_BODY;
  });
  const [letterSender, setLetterSender] = useState(() => {
    return localStorage.getItem('surprise_letter_sender') || DEFAULT_LETTER_SENDER;
  });

  // Start music softly once unlocked
  useEffect(() => {
    const timer = setTimeout(() => {
      musicBox.startMelody();
      setIsMusicPlaying(true);
    }, 600);
    return () => {
      clearTimeout(timer);
      musicBox.stopMelody();
    };
  }, []);

  const toggleMusic = () => {
    const status = musicBox.toggle();
    setIsMusicPlaying(status);
  };

  const handleOpenEnvelope = () => {
    if (isOpened || isOpening) return;
    setIsOpening(true);
    musicBox.playChimeSuccess();

    setTimeout(() => {
      fireConfetti();
      setIsOpened(true);
      setIsOpening(false);
    }, 700);
  };

  const handleSaveLetter = (title: string, body: string, sender: string) => {
    setLetterTitle(title);
    setLetterBody(body);
    setLetterSender(sender);
    localStorage.setItem('surprise_letter_title', title);
    localStorage.setItem('surprise_letter_body', body);
    localStorage.setItem('surprise_letter_sender', sender);
  };

  const handleResetLetter = () => {
    setLetterTitle(DEFAULT_LETTER_TITLE);
    setLetterBody(DEFAULT_LETTER_BODY);
    setLetterSender(DEFAULT_LETTER_SENDER);
    localStorage.removeItem('surprise_letter_title');
    localStorage.removeItem('surprise_letter_body');
    localStorage.removeItem('surprise_letter_sender');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-stone-800">
      {/* Background layer with high-fidelity generated bright romantic background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url('/src/assets/images/bright_romantic_bg_1790610872373.jpg')`,
        }}
      >
        {/* Soft luminous morning light overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-amber-50/40 to-rose-50/50 backdrop-blur-[1px]" />
      </div>

      {/* Top Floating Controls Bar */}
      <header className="relative z-20 flex items-center justify-between px-4 sm:px-8 py-5 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-sm font-serif italic text-stone-700 tracking-wide">
            A Birthday Gift Just For You
          </span>
          <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400 animate-pulse" />
        </div>

        <div className="flex items-center gap-2.5">
          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all border shadow-xs ${
              isMusicPlaying
                ? 'bg-rose-500/15 text-rose-800 border-rose-300/80 shadow-rose-200/50'
                : 'bg-white/80 text-stone-600 border-stone-200/80 hover:bg-white'
            }`}
            title={isMusicPlaying ? 'Хөгжим зогсоох' : 'Хөгжим тоглуулах'}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="h-3.5 w-3.5 text-rose-600 animate-bounce" />
                <span className="hidden sm:inline">Хөгжим: Асаалттай</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5 text-stone-500" />
                <span className="hidden sm:inline">Хөгжим: Унтраалттай</span>
              </>
            )}
          </button>

          {/* Lock again button */}
          <button
            onClick={onLockAgain}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/80 hover:bg-white text-stone-600 border border-stone-200/80 backdrop-blur-md shadow-xs transition-all"
            title="Нууц үгтэй хуудас руу буцах"
          >
            <Lock className="h-3.5 w-3.5 text-stone-500" />
            <span className="hidden sm:inline">Цоожлох</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* CLOSED ENVELOPE STAGE */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center space-y-6 max-w-lg w-full"
            >
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-rose-500 font-semibold">
                  Танд ирсэн нууцлаг захиа
                </span>
                <h2
                  className="text-3xl sm:text-4xl text-stone-800 font-normal tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Зөвхөн чамд зориулав
                </h2>
                <p className="text-stone-500 text-sm max-w-xs mx-auto">
                  Дугтуй дээр дараад лацыг онгойлгож, доторх нандин үгсийг уншаарай.
                </p>
              </div>

              {/* Interactive Envelope Object */}
              <div
                onClick={handleOpenEnvelope}
                className="group relative cursor-pointer select-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.99] w-full max-w-md"
              >
                {/* Floating ambient glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-200/40 via-rose-200/40 to-pink-200/40 rounded-3xl blur-xl group-hover:blur-2xl transition-all opacity-80" />

                {/* Envelope Body Card */}
                <div className="relative overflow-hidden rounded-2xl bg-[#FFFBF7] border border-[#EBE3D5] shadow-2xl p-6 sm:p-8">
                  {/* Subtle envelope texture / lines */}
                  <div className="aspect-[4/3] w-full relative rounded-xl overflow-hidden border border-stone-200/70 shadow-inner flex flex-col justify-between p-6 bg-gradient-to-b from-[#FDF9F3] to-[#F5ECE1]">
                    {/* Top Triangle Fold */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#EEDDC8] to-[#F6EDE2] shadow-md origin-top transition-transform duration-700 ${
                        isOpening ? '-rotate-180 opacity-60' : 'rotate-0'
                      }`}
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                      }}
                    />

                    {/* Left & Right Flaps for realistic envelope appearance */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40"
                      style={{
                        clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
                        background: 'linear-gradient(90deg, #E6D2BC, transparent)',
                      }}
                    />
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40"
                      style={{
                        clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
                        background: 'linear-gradient(270deg, #E6D2BC, transparent)',
                      }}
                    />

                    {/* Top address / watermark line */}
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-stone-400 font-mono">
                        <Stamp className="h-3.5 w-3.5 text-stone-400" />
                        <span>SPECIAL DELIVERY</span>
                      </div>
                      <span className="text-[11px] font-serif italic text-stone-400">
                        For My Love
                      </span>
                    </div>

                    {/* Centered Wax Seal Stamp */}
                    <div className="relative z-20 flex flex-col items-center justify-center my-auto">
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            '0 4px 14px rgba(185, 28, 28, 0.3)',
                            '0 6px 22px rgba(185, 28, 28, 0.45)',
                            '0 4px 14px rgba(185, 28, 28, 0.3)',
                          ],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2.2,
                          ease: 'easeInOut',
                        }}
                        className={`h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-rose-600 via-red-700 to-rose-900 border-2 border-amber-300/60 flex items-center justify-center text-amber-200 shadow-xl transition-transform ${
                          isOpening ? 'scale-125 rotate-45 opacity-70' : ''
                        }`}
                      >
                        <Heart className="h-7 w-7 sm:h-8 sm:w-8 fill-amber-200 text-amber-200 drop-shadow-sm" />
                      </motion.div>
                      <span className="mt-3 text-xs font-serif font-medium text-stone-600 group-hover:text-rose-600 transition-colors">
                        {isOpening ? 'Нээж байна...' : 'Нээхийн тулд дарна уу ✨'}
                      </span>
                    </div>

                    {/* Bottom greeting stamp */}
                    <div className="relative z-10 text-center">
                      <span className="text-[11px] tracking-wider text-stone-500 font-serif">
                        Teku@247 • With All My Heart
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pulsing button alternative */}
              <button
                onClick={handleOpenEnvelope}
                disabled={isOpening}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-medium text-sm shadow-md hover:shadow-lg hover:from-rose-500 hover:to-pink-500 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Захиаг онгойлгож үзэх</span>
              </button>
            </motion.div>
          ) : (
            /* OPENED LETTER STAGE */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 35, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl"
            >
              {/* Outer paper frame with deckle edges and luxury golden glow */}
              <div className="relative rounded-2xl bg-[#FFFDF9] border border-amber-200/80 shadow-[0_20px_60px_-15px_rgba(230,180,140,0.35)] p-6 sm:p-12 overflow-hidden">
                {/* Vintage decorative corner accents */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-300/80" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-300/80" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-300/80" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-300/80" />

                {/* Subtle paper watermark texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#F5E6D3_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

                {/* Top letter header */}
                <div className="relative z-10 text-center border-b border-amber-100 pb-6 mb-6">
                  <div className="inline-flex items-center justify-center gap-2 mb-2">
                    <div className="h-px w-8 bg-amber-300" />
                    <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                    <div className="h-px w-8 bg-amber-300" />
                  </div>

                  <h1
                    className="text-2xl sm:text-3xl text-stone-900 font-normal tracking-normal mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {letterTitle}
                  </h1>

                  <p className="text-xs text-stone-400 font-serif italic">
                    Төрсөн өдрийн онцгой мэндийг илгээв
                  </p>
                </div>

                {/* Letter Body */}
                <div className="relative z-10 space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                  {letterBody}
                </div>

                {/* Interactive Birthday Cake with Candle to blow out */}
                <div className="relative z-10 my-4">
                  <BirthdayCake />
                </div>

                {/* Sender Signature */}
                <div className="relative z-10 text-right pt-4 border-t border-amber-100 mt-6">
                  <p
                    className="text-lg sm:text-xl font-normal text-rose-900 italic"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {letterSender}
                  </p>
                </div>
              </div>

              {/* Action Buttons below the letter */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsOpened(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-white/90 hover:bg-white text-stone-700 border border-stone-200/90 shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5 text-stone-500" />
                  <span>Буцааж дугтуйлах</span>
                </button>

                <button
                  onClick={() => fireConfetti()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-white/90 hover:bg-white text-rose-700 border border-rose-200/90 shadow-xs hover:shadow transition-all cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5 text-rose-500" />
                  <span>Баярын салют буудуулах 🎉</span>
                </button>

                <button
                  onClick={() => setIsEditorOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-stone-900 hover:bg-stone-800 text-white shadow-xs hover:shadow transition-all cursor-pointer"
                  title="Захианы бичвэрийг өөрчлөх"
                >
                  <Edit3 className="h-3.5 w-3.5 text-amber-300" />
                  <span>Захиаг засах / өөрчлөх</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Note */}
      <footer className="relative z-10 py-4 text-center text-xs text-stone-400 select-none">
        <span>Made with love for your special day</span>
      </footer>

      {/* Letter Editor Modal */}
      <LetterEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        currentTitle={letterTitle}
        currentBody={letterBody}
        currentSender={letterSender}
        onSave={handleSaveLetter}
        onReset={handleResetLetter}
      />
    </div>
  );
}
