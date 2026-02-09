'use client';

import React, { useState } from 'react';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useVisualConfig } from '@/contexts/VisualConfigContext';


interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
  showFallback?: boolean;
  gradientRing?: boolean;
  glow?: boolean;
  dynamicColors?: boolean;
}

export function Avatar({
  src,
  alt = "Rao Sahab Profile Photo",
  size = 128,
  className = "",
  showFallback = true,
  gradientRing = true,
  glow = true,
  dynamicColors = true
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { config } = useVisualConfig();

  const hasValidSrc = src && !imageError;
  const showPlaceholder = !hasValidSrc && showFallback;

  const containerClasses = `
    relative rounded-full overflow-hidden
    ${gradientRing ? (dynamicColors ? 'p-1 bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]' : 'p-1 bg-gradient-to-b from-accent-violet to-accent-pink') : ''}
    ${glow ? 'shadow-[0_0_30px_var(--glow-color)] transition-all duration-300' : ''}
    ${className}
  `.trim();

  const imageClasses = `
    rounded-full object-cover transition-all duration-500
    ${isLoading ? 'opacity-0' : 'opacity-100'}
    hover:scale-105
  `.trim();

  return (
    <motion.div
      className={containerClasses}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      style={{ 
        width: size, 
        height: size,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseEnter={(e) => {
        if(glow) {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px var(--glow-color)`;
        }
      }}
      onMouseLeave={(e) => {
        if(glow) {
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px var(--glow-color)`;
        }
      }}
    >
      {hasValidSrc && (
        <img
          src={src}
          alt={alt}
          className={imageClasses}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImageError(true);
            setIsLoading(false);
          }}
        />
      )}

      {showPlaceholder && (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent-pink/20 border border-white/10 flex items-center justify-center">
          <User size={size * 0.4} className="text-primary" />
        </div>
      )}
    </motion.div>
  );
}