import { useState } from 'react';
import { X, Check, RotateCcw } from 'lucide-react';

interface LetterEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTitle: string;
  currentBody: string;
  currentSender: string;
  onSave: (title: string, body: string, sender: string) => void;
  onReset: () => void;
}

export function LetterEditorModal({
  isOpen,
  onClose,
  currentTitle,
  currentBody,
  currentSender,
  onSave,
  onReset,
}: LetterEditorModalProps) {
  const [title, setTitle] = useState(currentTitle);
  const [body, setBody] = useState(currentBody);
  const [sender, setSender] = useState(currentSender);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(title, body, sender);
    onClose();
  };

  const handleReset = () => {
    onReset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 p-6 text-stone-800 space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div>
            <h3 className="text-base font-semibold text-stone-900 font-serif">
              Захианы үгийг өөрчлөх
            </h3>
            <p className="text-xs text-stone-500">
              Та өөрийн хүссэн нандин үгсээ энд бичиж хадгалж болно.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Гарчиг (Хэнд зориулсан)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
              placeholder="Хамгийн нандин хүндээ..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Захианы эх бичвэр
            </label>
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full rounded-lg border border-stone-200 p-3 text-sm text-stone-800 leading-relaxed focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
              placeholder="Төрсөн өдрийн халуун мэндийг хүргэе..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Төгсгөл (Хэнээс)
            </label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
              placeholder="Үргэлж хайрладаг хүнээс чинь..."
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Анхны хувилбар руу буцаах
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors"
            >
              Болих
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium bg-rose-600 text-white hover:bg-rose-700 shadow-sm transition-all"
            >
              <Check className="h-3.5 w-3.5" />
              Хадгалах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
