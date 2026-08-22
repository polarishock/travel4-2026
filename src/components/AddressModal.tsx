import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check } from 'lucide-react';

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  address: string;
  japaneseAddress: string;
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  title,
  address,
  japaneseAddress
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(japaneseAddress);
    setCopied(true);
    if (navigator.vibrate) navigator.vibrate(50);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <div className="space-y-8 mt-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">目的地</p>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h3>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">日文地址 (司機出示用)</p>
                <p className="text-4xl font-black text-gray-900 leading-snug break-words font-japanese">
                  {japaneseAddress}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-500 italic leading-relaxed">
                  {address}
                </p>
                
                <button
                  onClick={handleCopy}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all ${
                    copied ? 'bg-green-100 text-green-700' : 'bg-gray-900 text-white'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={20} />
                      已複製！
                    </>
                  ) : (
                    <>
                      <Copy size={20} />
                      複製日文地址
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
