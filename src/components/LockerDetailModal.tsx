import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Box, Info } from 'lucide-react';

interface LockerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
  pin: string;
  note: string;
}

export const LockerDetailModal: React.FC<LockerDetailModalProps> = ({
  isOpen,
  onClose,
  location,
  pin,
  note
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Decoration */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D7F5E3] rounded-full opacity-50" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X size={18} className="text-gray-600" />
            </button>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#D7F5E3] rounded-2xl">
                  <Box size={24} className="text-[#19747E]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">置物櫃詳情</p>
                  <h3 className="text-xl font-black text-gray-900 leading-tight">{location}</h3>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Info size={14} className="text-[#19747E]" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">密碼 / 備註</span>
                  </div>
                  <p className="text-2xl font-black text-gray-900 mb-1">{pin}</p>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">{note}</p>
                </div>

                <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={14} className="text-[#19747E]" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">位置指引</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-black shrink-0">1</div>
                      <p className="text-xs font-medium text-gray-600">從 JR 高松站「改札口」出來後往南側出口走。</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-black shrink-0">2</div>
                      <p className="text-xs font-medium text-gray-600">經過綠色窗口後，左手邊即是大型置物櫃區。</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-black shrink-0">3</div>
                      <p className="text-xs font-medium text-gray-600">編號 #003 位於底層，適合放置 29 吋行李箱。</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold transition-all hover:bg-black"
              >
                我知道了
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
