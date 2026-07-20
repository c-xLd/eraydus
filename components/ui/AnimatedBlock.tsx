"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function AnimatedBlock({ children, className = '', delay = 0, y = 30 }: { children: ReactNode, className?: string, delay?: number, y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.01, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedImage({ src, alt, className = '' }: { src: string, alt: string, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0.01, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`overflow-hidden group ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
      />
    </motion.div>
  );
}
