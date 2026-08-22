import React from 'react';
import { Share, PlusSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const IOSInstallPrompt: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Check if it's iOS and not already in standalone mode
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isStandalone = (window.navigator as any).standalone === true;
    
    // Only show if it's iOS and not yet installed
    if (isIOS && !isStandalone) {
      const hasSeenPrompt = localStorage.getItem('ios_install_prompt_seen');
      if (!hasSeenPrompt) {
        // Show after a short delay
        const timer = setTimeout(() => setIsVisible(true), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const closePrompt = () => {
    setIsVisible(false);
    localStorage.setItem('ios_install_prompt_seen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-8 left-6 right-6 z-[100] md:hidden"
        >
          <div className="bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl p-5 shadow-2xl shadow-black/10">
            <button 
              onClick={closePrompt}
              className="absolute top-3 right-3 text-black/20 hover:text-black/40 p-1"
            >
              <X size={18} />
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#FF5E3A] to-[#FFCC00] flex items-center justify-center shadow-lg">
                <PlusSquare className="text-white" size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black text-[#1C1C1E]">安裝到主畫面</h4>
                <p className="text-[11px] font-bold text-[#1C1C1E]/40 uppercase tracking-wider">取得最佳 iOS 使用體驗</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#1C1C1E]/80 font-bold">
                <div className="h-7 w-7 rounded-lg bg-black/5 flex items-center justify-center">
                  <Share size={14} className="text-[#007AFF]" />
                </div>
                <span>1. 點擊瀏覽器下方的「分享」按鈕</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#1C1C1E]/80 font-bold">
                <div className="h-7 w-7 rounded-lg bg-black/5 flex items-center justify-center">
                  <PlusSquare size={14} />
                </div>
                <span>2. 選擇「加入主畫面」</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-black/5 text-center">
              <button 
                onClick={closePrompt}
                className="text-[10px] font-black text-[#007AFF] uppercase tracking-[0.2em]"
              >
                我知道了
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
