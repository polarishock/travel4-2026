import React from 'react';
import { Plane, Hotel, Box, Copy, Navigation, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { FLIGHT_DATA, HOTELS_DATA, LOCKER_DATA } from '../data';
import { AddressModal } from './AddressModal';
import { BoardingPassModal } from './BoardingPassModal';
import { LockerDetailModal } from './LockerDetailModal';
import { HotelInfo } from '../types';

export const HeroSection: React.FC = () => {
  const [selectedHotel, setSelectedHotel] = React.useState<HotelInfo | null>(null);
  const [isBoardingPassOpen, setIsBoardingPassOpen] = React.useState(false);
  const [isLockerOpen, setIsLockerOpen] = React.useState(false);
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Drag to scroll logic
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (window.innerWidth >= 1024) return; // Disable on desktop grid
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCopy = (e: React.MouseEvent, hotel: HotelInfo) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hotel.japaneseAddress);
    setCopiedId(hotel.name);
    if (navigator.vibrate) navigator.vibrate(50);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNavigate = (e: React.MouseEvent, hotel: HotelInfo) => {
    e.stopPropagation();
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address + ' ' + hotel.name)}`;
    window.open(url, '_blank');
  };

  const handleBtnClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (id === 'flight') setIsBoardingPassOpen(true);
    if (id === 'locker') setIsLockerOpen(true);
  };

  interface Slide {
    id: string;
    color: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    content: string;
    hotel?: HotelInfo;
    action?: boolean;
    badge?: string;
    btnText?: string;
    note?: string;
  }

  const slides: Slide[] = [
    {
      id: 'flight',
      color: 'bg-white/60', 
      icon: <Plane size={24} className="text-[#007AFF]" />, // Electric Blue
      title: '航班資訊',
      subtitle: FLIGHT_DATA.code,
      content: `${FLIGHT_DATA.route} • ${FLIGHT_DATA.time}`,
      badge: '準點',
      btnText: '登機證'
    },
    ...HOTELS_DATA.map((hotel, index) => ({
      id: `hotel-${index}`,
      color: 'bg-white/60', 
      icon: <Hotel size={24} className="text-[#34C759]" />, // Vibrant Emerald
      title: index === 0 ? '住宿地點 (丸龜)' : '住宿地點 (高松)',
      subtitle: hotel.name,
      content: hotel.address,
      hotel: hotel,
      action: true
    })),
    {
      id: 'locker',
      color: 'bg-white/60',
      icon: <Box size={24} className="text-[#FFCC00]" />, // Sunny Yellow
      title: '行李寄放 / 儲物櫃',
      subtitle: LOCKER_DATA.location,
      content: `PIN: ${LOCKER_DATA.pin} • ${LOCKER_DATA.note}`,
      btnText: '詳情',
      note: '大型櫃位'
    }
  ];

  return (
    <div className="mb-12">
      <div className="relative">
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 gap-6 pb-4 ${isDragging ? 'cursor-grabbing select-none scroll-auto' : 'cursor-grab scroll-smooth'}`}
          onScroll={(e) => {
            const scrollLeftPos = (e.target as HTMLDivElement).scrollLeft;
            const index = Math.round(scrollLeftPos / (window.innerWidth - 80));
            setActiveSlide(index);
          }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="snap-center shrink-0 w-[calc(100vw-64px)] md:w-80 lg:w-full">
              <GlassCard 
                bgColor={slide.color} 
                className="p-8 h-[260px] flex flex-col justify-between shadow-lg shadow-black/5 backdrop-blur-2xl border-white/50 rounded-[32px]"
                onClick={slide.hotel ? () => setSelectedHotel(slide.hotel!) : undefined}
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-white/50">
                      {slide.icon}
                    </div>
                    {slide.badge && (
                      <span className="rounded-full bg-[#FF5E3A]/10 px-3 py-1 text-[10px] font-bold text-[#FF5E3A]">
                        {slide.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1C1C1E]/40 mb-1">{slide.title}</p>
                  <h3 className="text-xl font-extrabold text-[#1C1C1E] leading-tight tracking-tight">{slide.subtitle}</h3>
                </div>

                <div className="mt-4 flex gap-2">
                  {slide.action && slide.hotel ? (
                    <>
                      <button 
                        onClick={(e) => handleCopy(e, slide.hotel!)}
                        className="rounded-full bg-[#FF5E3A] px-5 py-2.5 text-[11px] font-bold tracking-tight text-white shadow-lg shadow-[#FF5E3A]/20 transition-all hover:brightness-110 active:scale-95"
                      >
                        {copiedId === slide.hotel.name ? '已複製！' : '複製地址'}
                      </button>
                      <button 
                        onClick={(e) => handleNavigate(e, slide.hotel!)}
                        className="rounded-full bg-white/80 px-5 py-2.5 text-[11px] font-bold tracking-tight text-[#1C1C1E] border border-white transition-all hover:bg-white active:scale-95"
                      >
                        導航
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={(e) => handleBtnClick(e, slide.id)}
                      className="rounded-full bg-[#FF5E3A] px-5 py-2.5 text-[11px] font-bold tracking-tight text-white shadow-lg shadow-[#FF5E3A]/20 transition-all hover:brightness-110 active:scale-95"
                    >
                      {slide.btnText || '詳情'}
                    </button>
                  )}
                  {slide.note && (
                    <span className="text-[10px] font-medium opacity-50 italic flex items-center">
                      {slide.note}
                    </span>
                  )}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-1.5 mt-4 lg:hidden">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === i ? 'w-4 bg-gray-800' : 'w-1.5 bg-gray-300'}`}
            />
          ))}
        </div>
      </div>

      <AddressModal 
        isOpen={!!selectedHotel}
        onClose={() => setSelectedHotel(null)}
        title={selectedHotel?.name || ''}
        address={selectedHotel?.address || ''}
        japaneseAddress={selectedHotel?.japaneseAddress || ''}
      />

      <BoardingPassModal
        isOpen={isBoardingPassOpen}
        onClose={() => setIsBoardingPassOpen(false)}
        flightCode={FLIGHT_DATA.code}
        route={FLIGHT_DATA.route}
      />

      <LockerDetailModal
        isOpen={isLockerOpen}
        onClose={() => setIsLockerOpen(false)}
        location={LOCKER_DATA.location}
        pin={LOCKER_DATA.pin}
        note={LOCKER_DATA.note}
      />
    </div>
  );
};
