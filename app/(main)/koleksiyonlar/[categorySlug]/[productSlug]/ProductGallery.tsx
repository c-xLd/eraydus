'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
  collectionName: string
  isNew?: boolean
}

export default function ProductGallery({ images, productName, collectionName, isNew }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0)
  
  // Magnifying Glass Effect
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
  const [isZoomed, setIsZoomed] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold) {
      // Swipe Left -> Next
      setActiveImage(prev => (prev + 1) % images.length)
    } else if (info.offset.x > swipeThreshold) {
      // Swipe Right -> Prev
      setActiveImage(prev => (prev - 1 + images.length) % images.length)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full lg:w-[46%] space-y-4"
    >
      {/* Main Image */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-surface border border-border/50 group touch-pan-y cursor-zoom-in"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 select-none"
          >
            {/* Blurred background image for mixed aspect ratios */}
            <Image
              src={images[activeImage]}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover blur-3xl opacity-35 scale-110 pointer-events-none"
            />

            {/* Main containment image (always 100% visible) */}
            <Image
              src={images[activeImage]}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-transform duration-100 ease-out pointer-events-none"
              style={{
                transformOrigin: isZoomed ? `${zoomPos.x}% ${zoomPos.y}%` : 'center',
                transform: isZoomed ? 'scale(1.4)' : 'scale(1)',
              }}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Collection Badge */}
        <div className="absolute top-6 left-6 z-10">
          <span className="bg-black/60 backdrop-blur-xl text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/10">
            {collectionName}
          </span>
        </div>

        {/* New Badge */}
        {isNew && (
          <div className="absolute top-6 right-6 z-10">
            <span className="bg-champagne text-black text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">
              Yeni
            </span>
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-6 right-6 z-10 bg-black/50 backdrop-blur-xl text-white text-xs px-4 py-2 rounded-full border border-white/10 font-medium">
            {activeImage + 1} / {images.length}
          </div>
        )}

        {/* Arrow Controls (Desktop Overlay on Hover) */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveImage(prev => (prev - 1 + images.length) % images.length)
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 size-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setActiveImage(prev => (prev + 1) % images.length)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 size-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative w-20 h-20 lg:w-24 lg:h-24 shrink-0 rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer ${activeImage === i
                ? 'border-champagne bg-surface shadow-lg'
                : 'opacity-50 border-white/5 hover:opacity-100 hover:border-white/20'
                }`}
            >
              <Image src={img} alt={`Görsel ${i + 1}`} fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}
