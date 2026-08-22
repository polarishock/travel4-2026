import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plane, QrCode, MapPin } from 'lucide-react';

interface BoardingPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  flightCode: string;
  route: string;
}

export const BoardingPassModal: React.FC<BoardingPassModalProps> = ({
  isOpen,
  onClose,
  flightCode,
  route
}) => {
  const [from, to] = route.split(' ➔ ');

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
            initial={{ scale: 0.9, y: 40, rotate: -2 }}
            animate={{ scale: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.9, y: 40, rotate: 2 }}
            className="w-full max-w-sm bg-white rounded-[2rem] overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ticket Header */}
            <div className="bg-[#E0D7F5] p-6 pb-12 relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/40 hover:bg-white/60 transition-colors"
              >
                <X size={18} className="text-gray-800" />
              </button>
              <div className="flex items-center gap-2 mb-8">
                <div className="p-2 bg-white/60 rounded-xl">
                  <Plane size={20} className="text-[#8E7AB5]" />
                </div>
                <span className="font-black text-gray-800 tracking-tighter">SKY ADVENTURE</span>
              </div>

              <div className="flex justify-between items-center text-gray-900">
                <div className="text-center">
                  <p className="text-4xl font-black">{from.includes('(') ? from.split('(')[1].replace(')', '') : 'TPE'}</p>
                  <p className="text-[10px] font-bold opacity-60 mt-1">{from.split(' ')[0]}</p>
                </div>
                <div className="flex-1 flex flex-col items-center px-4">
                  <div className="w-full h-[2px] border-t-2 border-dashed border-gray-400 relative">
                    <Plane size={14} className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-gray-400 rotate-90" />
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 mt-2">{flightCode}</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-black">{to.includes('(') ? to.split('(')[1].replace(')', '') : 'TAK'}</p>
                  <p className="text-[10px] font-bold opacity-60 mt-1">{to.split(' ')[0]}</p>
                </div>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="p-6 pt-10 bg-white relative">
              {/* Notches for ticket look */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-black/60 rounded-full" />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-black/60 rounded-full" />
              <div className="absolute top-0 left-0 right-0 h-4 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Passenger</p>
                  <p className="text-sm font-black text-gray-900">TRAVELER / TPE</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Class</p>
                  <p className="text-sm font-black text-gray-900">ECONOMY</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Gate</p>
                  <p className="text-sm font-black text-gray-900">B7</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Seat</p>
                  <p className="text-sm font-black text-gray-900">18K</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Boarding</p>
                  <p className="text-sm font-black text-gray-900">13:50</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date</p>
                  <p className="text-sm font-black text-gray-900">05 SEP 2026</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t-2 border-dashed border-gray-100 flex flex-col items-center">
                <QrCode size={120} className="text-gray-900 mb-4" />
                <p className="text-[10px] font-mono font-bold text-gray-400">CI-178-20260905-SHIKOKU</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
