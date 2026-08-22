import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Ticket, Camera, ChevronDown, BookOpen } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { ITINERARY_DATA } from '../data';
import { Attraction } from '../types';

export const ItineraryTimeline: React.FC = () => {
  const [activeDay, setActiveDay] = React.useState(1);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const currentDay = ITINERARY_DATA.find(d => d.day === activeDay);

  // Drag to scroll logic for tabs
  const tabRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (tabRef.current?.offsetLeft || 0));
    setScrollLeft(tabRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !tabRef.current) return;
    e.preventDefault();
    const x = e.pageX - (tabRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    tabRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <h2 className="text-2xl font-extrabold text-[#1C1C1E] tracking-tight">行程規劃 <span className="text-[#AF52DE]">.</span></h2>
        <div 
          ref={tabRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2 ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
        >
          {ITINERARY_DATA.map((day) => (
            <button
              key={day.day}
              onClick={() => setActiveDay(day.day)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                activeDay === day.day 
                  ? 'bg-[#AF52DE] text-white shadow-[0_8px_20px_rgba(175,82,222,0.3)]' 
                  : 'bg-white/60 text-[#1C1C1E]/40 hover:text-[#1C1C1E] hover:bg-white/80'
              }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>
      </div>

      <div className="relative space-y-8 before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-[2px] before:bg-black/5">
        {currentDay?.attractions.map((attraction, i) => (
          <div key={attraction.id} className="flex gap-6 items-start relative">
            <div className="shrink-0 pt-3 relative z-10">
              <div className="h-6 w-6 rounded-full bg-[#F9F6F0] border-4 border-[#AF52DE] shadow-sm" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-[#AF52DE] tracking-tighter">
                  {attraction.time}
                </span>
                <div className="h-[1px] flex-1 bg-black/5" />
              </div>
              <AttractionCard 
                attraction={attraction}
                isExpanded={expandedId === attraction.id}
                onToggle={() => setExpandedId(expandedId === attraction.id ? null : attraction.id)}
                colorIndex={i}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AttractionCard: React.FC<{ 
  attraction: Attraction; 
  isExpanded: boolean; 
  onToggle: () => void;
  colorIndex: number;
}> = ({ attraction, isExpanded, onToggle, colorIndex }) => {
  return (
    <GlassCard 
      bgColor="bg-white/60"
      className={`p-6 border-white/50 transition-all rounded-[32px] ${isExpanded ? 'shadow-xl shadow-black/5' : 'shadow-sm'}`}
      onClick={onToggle}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-[#1C1C1E]/30 uppercase tracking-[0.2em] bg-black/[0.03] px-2.5 py-1 rounded-md">
              Highlights
            </span>
            {attraction.ticket && (
              <div className="flex items-center gap-1 text-[10px] font-bold text-[#AF52DE] bg-[#AF52DE]/10 px-2.5 py-1 rounded-md">
                <Ticket size={10} /> {attraction.ticket}
              </div>
            )}
          </div>
          <h3 className="text-xl font-extrabold text-[#1C1C1E] tracking-tight">{attraction.name}</h3>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="p-2 bg-black/[0.03] rounded-full"
        >
          <ChevronDown size={20} className="text-[#1C1C1E]/20" />
        </motion.div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="overflow-hidden"
          >
            <div className="pt-6 space-y-6">
              <div className="h-[1px] bg-black/5 w-full" />
              
              <div className="space-y-6">
                {attraction.details && (
                  <div className="flex gap-4">
                    <div className="shrink-0 h-10 w-10 rounded-full bg-[#007AFF]/5 flex items-center justify-center">
                      <BookOpen size={18} className="text-[#007AFF]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-[#1C1C1E]/30 uppercase tracking-[0.2em] mb-1.5">景點詳解 / Details</p>
                      <p className="text-sm text-[#1C1C1E]/90 leading-relaxed font-bold">
                        {attraction.details}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-[#AF52DE]/5 flex items-center justify-center">
                    <MapPin size={18} className="text-[#AF52DE]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-[#1C1C1E]/30 uppercase tracking-[0.2em] mb-1.5">景點指南 / Guide</p>
                    <p className="text-sm text-[#1C1C1E]/80 leading-relaxed font-bold">
                      {attraction.guide}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-full bg-[#FFCC00]/10 flex items-center justify-center">
                    <Camera size={18} className="text-[#FFCC00]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-[#1C1C1E]/30 uppercase tracking-[0.2em] mb-1.5">最佳拍照點 / Photo Spot</p>
                    <p className="text-sm text-[#1C1C1E]/70 leading-relaxed font-bold italic">
                      {attraction.photoSpot}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#FF5E3A]"></div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#FF5E3A]/20 to-transparent"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};
