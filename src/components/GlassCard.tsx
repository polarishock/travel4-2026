import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  bgColor = "bg-white/60",
  onClick 
}) => {
  return (
    <motion.div
      whileHover={onClick ? { y: -4, scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.98, opacity: 0.9 } : undefined}
      onClick={onClick}
      className={`
        backdrop-blur-2xl 
        border border-white/50 
        rounded-[32px] 
        shadow-[0_8px_32px_rgba(0,0,0,0.05)]
        overflow-hidden
        ${bgColor} 
        ${className}
        ${onClick ? 'cursor-pointer active:opacity-80' : ''}
      `}
    >
      {children}
    </motion.div>
  );
};
