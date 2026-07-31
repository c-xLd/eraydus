'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut, Eye } from 'lucide-react'
import { cn, storageUrl } from '@/lib/utils'

interface ProductGalleryProps {
  images: { id: string; product_id: string; image_url: string; alt_text: string | null; sort_order: number }[]
  mainImage: string | null
  name: string
}

export function ProductGallery({ images, mainImage, name }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxZoom, setLightboxZoom] = useState(1)
  
  // Magnifier state
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const imageContainerRef = useRef<HTMLDivElement>(null)

  // Construct final image list. Combine main image if it exists with gallery
  const allImages: string[] = []
  if (mainImage) allImages.push(mainImage)
  
  images.forEach(img => {
    if (img.image_url && img.image_url !== mainImage && !allImages.includes(img.image_url)) {
      allImages.push(img.image_url)
    }
  })

  const hasImages = allImages.length > 0
  
  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, currentIndex, allImages.length])

  if (!hasImages) {
    return (
      <div className="aspect-square sm:aspect-[4/3] max-h-[520px] bg-muted/20 rounded-2xl flex items-center justify-center p-8 text-center border border-border">
        <p className="text-muted-foreground font-mono">{name} <br/> (Görsel Bulunamadı)</p>
      </div>
    )
  }

  const currentImage = storageUrl('products', allImages[currentIndex])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length)
    setLightboxZoom(1)
  }
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    setLightboxZoom(1)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setMousePos({ x, y })
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 items-start">
      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 hide-scrollbar lg:w-20 flex-shrink-0">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all p-1 bg-muted/10",
                currentIndex === idx ? "border-champagne ring-2 ring-champagne/20" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={storageUrl('products', img)}
                alt={`${name} thumbnail ${idx + 1}`}
                fill
                className="object-contain p-0.5"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Container */}
      <div
        ref={imageContainerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square max-h-[520px] rounded-2xl overflow-hidden bg-muted/5 border border-border/40 group p-4 sm:p-8 flex items-center justify-center cursor-crosshair select-none"
      >
        {/* Image Counter & Lens Hint */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-mono tracking-wider">
            {currentIndex + 1} / {allImages.length}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-medium text-muted-foreground border border-border/40">
            <Eye className="w-3 h-3 text-champagne" />
            Büyütmek için üzerine gelin
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) prevImage()
              else if (info.offset.x < -100) nextImage()
            }}
          >
            <Image
              src={currentImage}
              alt={name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Magnifier Hover Lens */}
        {isHovered && (
          <div
            className="absolute pointer-events-none rounded-2xl border-2 border-champagne/80 shadow-2xl overflow-hidden hidden md:block z-30"
            style={{
              width: 180,
              height: 180,
              top: `calc(${mousePos.y}% - 90px)`,
              left: `calc(${mousePos.x}% - 90px)`,
              backgroundImage: `url(${currentImage})`,
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              backgroundSize: '280%',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}

        {/* Fullscreen Lightbox Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-md rounded-full text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background shadow-md z-20"
          title="Tam ekran incele"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 lg:p-12 select-none"
          >
            {/* Top Bar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50 text-white">
              <div className="flex items-center gap-3">
                <span className="font-medium text-sm sm:text-base">{name}</span>
                <span className="px-3 py-1 rounded-full bg-white/10 font-mono text-xs text-white/80">
                  {currentIndex + 1} / {allImages.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxZoom((z) => Math.max(1, z - 0.5))}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                  title="Uzaklaştır"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLightboxZoom((z) => Math.min(3, z + 0.5))}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                  title="Yakınlaştır"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white ml-2"
                  title="Kapat"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Lightbox Image */}
            <div className="relative w-full max-w-6xl aspect-square lg:aspect-[4/3] flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ scale: lightboxZoom }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentImage}
                  alt={name}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </motion.div>
            </div>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 lg:left-12 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 lg:right-12 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
