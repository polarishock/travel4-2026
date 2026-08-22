import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BarChart3, PieChart, Calendar, CheckCircle2 } from 'lucide-react';
import { TodoItem, DayItinerary } from '../types';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  todos: TodoItem[];
  itinerary: DayItinerary[];
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  todos,
  itinerary
}) => {
  const completedTodos = todos.filter(t => t.completed).length;
  const todoProgress = Math.round((completedTodos / todos.length) * 100);
  
  const totalAttractions = itinerary.reduce((acc, day) => acc + day.attractions.length, 0);
  const totalDays = itinerary.length;

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
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F1D7] rounded-bl-full opacity-30" />

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors z-10"
            >
              <X size={18} className="text-gray-600" />
            </button>

            <div className="relative z-10 space-y-8">
              <div className="mb-2">
                <div className="p-3 bg-gray-900 rounded-2xl w-fit mb-4">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 leading-tight">旅程概覽</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">SHIKOKU ADVENTURE STATS</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
                  <Calendar size={18} className="text-gray-400 mb-3" />
                  <p className="text-2xl font-black text-gray-900">{totalDays}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">總天數</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-3xl border border-gray-100">
                  <PieChart size={18} className="text-gray-400 mb-3" />
                  <p className="text-2xl font-black text-gray-900">{totalAttractions}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">景點總數</p>
                </div>
              </div>

              <div className="bg-[#F5F1D7] p-6 rounded-[2rem] border border-white/40 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-gray-800" />
                    <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">行李準備進度</span>
                  </div>
                  <span className="text-xl font-black text-gray-900">{todoProgress}%</span>
                </div>
                <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${todoProgress}%` }}
                    className="h-full bg-black shadow-sm"
                  />
                </div>
                <p className="text-[10px] font-bold text-gray-500 mt-4 italic text-center">
                  目前已完成 {completedTodos} / {todos.length} 個項目
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold transition-all hover:bg-black"
              >
                關閉統計
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
