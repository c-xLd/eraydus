"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Image from 'next/image';

export function AnimatedBlock({ children, className = '', delay = 0, y = 30 }: { children: ReactNode, className?: string, delay?: number, y?: number }) {
  return (
    <motion.div
      initial={{ y }}
      whileInView={{ y: 0 }}
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
      initial={{ scale: 0.95 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden group ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 800px"
        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
      />
    </motion.div>
  );
}
