'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface AnimatedSchematicProps {
  layout: string
  widthX: number
  depthY: number
  doorSystem: string
  glassType: string
  profileColor: string
  patternUrl: string | null
  baseType: string
  handleType: string
}

// Premium glass tints with subtle opacity
const glassColors = {
  clear: 'rgba(255, 255, 255, 0.05)',
  smoke: 'rgba(30, 30, 35, 0.5)',
  bronze: 'rgba(130, 90, 60, 0.4)',
  frosted: 'rgba(255, 255, 255, 0.85)',
  mirrored: 'rgba(180, 190, 200, 0.95)',
}

export function AnimatedSchematic({
  layout, widthX, depthY, doorSystem, glassType, profileColor, patternUrl, baseType, handleType
}: AnimatedSchematicProps) {
  
  const [isHovered, setIsHovered] = useState(false)
  
  const gColor = glassColors[glassType as keyof typeof glassColors] || glassColors.clear
  
  // Parametric Scaling Math
  // Base heights (Y coordinate of the bottom of the glass)
  const tHeight = baseType === 'jacuzzi' ? 65 : baseType === 'tub' ? 45 : baseType === 'tray' ? 15 : 0
  const baseY = 370 - tHeight
  
  // Wall-to-Wall scale
  // By raising the base value to 180, the cabin won't look extremely narrow at minimum sizes (60cm)
  const wallRatio = Math.max(0, (widthX - 60) / 190)
  const wallW = 180 + wallRatio * 140 // min 180, max 320
  const wL = 200 - wallW / 2
  const wR = 200 + wallW / 2
  
  // Corner scale
  const widthRatio = Math.max(0, (widthX - 60) / 190)
  const depthRatio = Math.max(0, (depthY - 60) / 190)
  
  // By raising the base value, the cabin won't look extremely narrow at minimum sizes (60cm)
  const cFrontW = 100 + widthRatio * 50  // min 100, max 150
  const cSideDx = -(100 + depthRatio * 40) // min -100, max -140
  const cSideDy = -(28 + depthRatio * 12) // min -28, max -40
  
  const cR = 150 + cFrontW
  const cLX = 150 + cSideDx
  const cLY = 90 + cSideDy

  // Walk-in scale
  const walkW = 80 + ((widthX - 60) / 190) * 160
  const wkL = 200 - walkW / 2
  const wkR = 200 + walkW / 2

  // ─── BI-FOLD DOOR MATH ───
  const getBiFoldPanels = (
    idPrefix: string,
    xWall: number, yWall: number,
    xSlide: number, ySlide: number,
    botYWall: number, botYSlide: number,
    invertFold: boolean = false
  ) => {
    const dx = xSlide - xWall
    const dy = ySlide - yWall
    const L = Math.sqrt(dx*dx + dy*dy)
    const ux = dx / L
    const uy = dy / L
    const nx = invertFold ? -uy : uy
    const ny = invertFold ? ux : -ux
    const openRatio = 0.75 // Folds subtly to 75% of original width (opens 25%)
    
    // Closed Path
    const mx = xWall + dx * 0.5
    const my = yWall + dy * 0.5
    const bmx = xWall + dx * 0.5
    const bmy = botYWall + (botYSlide - botYWall) * 0.5
    
    const dClosed1 = `M ${xWall} ${yWall} L ${mx} ${my} L ${bmx} ${bmy} L ${xWall} ${botYWall} Z`
    const dClosed2 = `M ${mx} ${my} L ${xSlide} ${ySlide} L ${xSlide} ${botYSlide} L ${bmx} ${bmy} Z`
    
    // Open Path (V-shape)
    const slideDist = L * (1 - openRatio)
    const oxSlide = xSlide - ux * slideDist
    const oySlide = ySlide - uy * slideDist
    const oxSlideBot = xSlide - ux * slideDist
    const oySlideBot = botYSlide - uy * slideDist
    
    const hx_base = xWall + dx * (openRatio * 0.5)
    const hy_base = yWall + dy * (openRatio * 0.5)
    const hDist = Math.sqrt(Math.max(0, Math.pow(L*0.5, 2) - Math.pow(L*openRatio*0.5, 2)))
    
    const hx_top = hx_base + nx * hDist
    const hy_top = hy_base + ny * hDist
    
    const hx_bot_base = xWall + dx * (openRatio * 0.5)
    const hy_bot_base = botYWall + (botYSlide - botYWall) * (openRatio * 0.5)
    
    const hx_bot = hx_bot_base + nx * hDist
    const hy_bot = hy_bot_base + ny * hDist
    
    const dOpen1 = `M ${xWall} ${yWall} L ${hx_top} ${hy_top} L ${hx_bot} ${hy_bot} L ${xWall} ${botYWall} Z`
    const dOpen2 = `M ${hx_top} ${hy_top} L ${oxSlide} ${oySlide} L ${oxSlideBot} ${oySlideBot} L ${hx_bot} ${hy_bot} Z`
    
    // Calculate Handle pos on panel 2 (near the sliding edge/magnetic closure)
    const handlePosRatio = 0.8 // 80% along panel 2
    const hxClosed = mx + dx * 0.5 * handlePosRatio
    const hyClosed = my + dy * 0.5 * handlePosRatio + (botYSlide - ySlide)*0.5
    const hxOpen = hx_top + (oxSlide - hx_top) * handlePosRatio
    const hyOpen = hy_top + (oySlide - hy_top) * handlePosRatio + (oySlideBot - oySlide)*0.5
    
    return {
      panels: [
        { id: `${idPrefix}-1`, d: isHovered ? dOpen1 : dClosed1, isSliding: true },
        { id: `${idPrefix}-2`, d: isHovered ? dOpen2 : dClosed2, isSliding: true }
      ],
      handle: {
        x: hxClosed, y: hyClosed,
        slideOffsetX: hxOpen - hxClosed,
        slideOffsetY: hyOpen - hyClosed
      }
    }
  }

  let biFoldHandles: any[] = []

  // ─── BASE / TRAY DRAWING ───
  // We draw 3D blocks for the bases to make them look premium.
  const getBasePolygons = () => {
    let top = "", front = "", side = ""

    if (layout === 'corner') {
      top = `M ${cLX} ${baseY + cSideDy} L 150 ${baseY} L ${cR} ${baseY} L ${cR + (cLX - 150)} ${baseY + cSideDy} Z`
      front = `M 150 ${baseY} L ${cR} ${baseY} L ${cR} ${baseY + tHeight} L 150 ${baseY + tHeight} Z`
      side = `M ${cLX} ${baseY + cSideDy} L 150 ${baseY} L 150 ${baseY + tHeight} L ${cLX} ${baseY + cSideDy + tHeight} Z`
    } else if (layout === 'wall-to-wall') {
      top = ""
      front = `M ${wL} ${baseY} L ${wR} ${baseY} L ${wR} ${baseY + tHeight} L ${wL} ${baseY + tHeight} Z`
    } else if (layout === 'walk-in') {
      top = ""
      front = `M ${wkL} ${baseY} L ${wkR} ${baseY} L ${wkR} ${baseY + tHeight} L ${wkL} ${baseY + tHeight} Z`
    }
    return { top, front, side }
  }

  const basePolys = getBasePolygons()

  // Determine gradient ID based on profile color
  const profileGrad = `url(#prof-${profileColor})`

  // ─── GLASS PANELS ───

  const getPanels = () => {
    const panels = []
    
    if (layout === 'corner') {
      // SIDE GLASS
      if (doorSystem !== '2-sabit-2-kayar') {
        panels.push({
          id: 'side-fixed',
          d: `M ${cLX} ${cLY} L 150 90 L 150 ${baseY} L ${cLX} ${baseY + cSideDy} Z`,
          isSliding: false,
          slideOffsetX: 0
        })
      }
      
      // FRONT GLASS
      if (doorSystem === '2-sabit-2-kayar') {
        // Corner Entry logic
        const midX = 150 + cSideDx / 2
        const midY = 90 + cSideDy / 2
        // Side Fixed
        panels.push({ id: 'side-fixed-wall', d: `M ${cLX} ${cLY} L ${midX} ${midY} L ${midX} ${baseY + cSideDy/2} L ${cLX} ${baseY + cSideDy} Z`, isSliding: false })
        
        // Side Slider (Shifted down by 2 pixels for depth, overlaps fixed by 4px)
        const sTopY = midY + 2
        const sBotY = baseY + cSideDy/2 + 2
        panels.push({ 
          id: 'side-slide-corner', 
          d: `M ${midX-4} ${sTopY-1} L 150 92 L 150 ${baseY+2} L ${midX-4} ${sBotY-1} Z`, 
          isSliding: true, 
          slideOffsetX: cSideDx * 0.45, 
          slideOffsetY: cSideDy * 0.45 
        })
        
        // Front Fixed
        const fMidX = 150 + cFrontW / 2
        panels.push({ id: 'front-fixed-wall', d: `M ${fMidX} 90 L ${cR} 90 L ${cR} ${baseY} L ${fMidX} ${baseY} Z`, isSliding: false })
        
        // Front Slider (Shifted down by 2 pixels for depth, overlaps fixed by 4px)
        panels.push({ 
          id: 'front-slide-corner', 
          d: `M 150 92 L ${fMidX+4} 92 L ${fMidX+4} ${baseY+2} L 150 ${baseY+2} Z`, 
          isSliding: true, 
          slideOffsetX: cFrontW * 0.45, 
          slideOffsetY: 0 
        })
      } else if (doorSystem === '1-sabit-1-kayar') {
        const fMidX = 150 + cFrontW / 2
        // Left fixed
        panels.push({ id: 'front-fixed', d: `M 150 90 L ${fMidX} 90 L ${fMidX} ${baseY} L 150 ${baseY} Z`, isSliding: false })
        // Right slider
        panels.push({ id: 'front-slide', d: `M ${fMidX-2} 92 L ${cR} 92 L ${cR} ${baseY+2} L ${fMidX-2} ${baseY+2} Z`, isSliding: true, slideOffsetX: -cFrontW * 0.45 })
      } else if (doorSystem === 'katlanir') {
        const leftFold = getBiFoldPanels('fold-l', cLX, cLY, 150, 90, baseY + cSideDy, baseY, false)
        const rightFold = getBiFoldPanels('fold-r', cR, 90, 150, 90, baseY, baseY, true)
        panels.push(...leftFold.panels, ...rightFold.panels)
        biFoldHandles.push(leftFold.handle, rightFold.handle)
      } else {
        panels.push({ id: 'front-all', d: `M 150 90 L ${cR} 90 L ${cR} ${baseY} L 150 ${baseY} Z`, isSliding: false })
      }
    } 
    else if (layout === 'wall-to-wall') {
      if (doorSystem === '2-sabit-2-kayar') {
        const qW = wallW * 0.25
        panels.push({ id: 'fixed-l', d: `M ${wL} 100 L ${wL + qW} 100 L ${wL + qW} ${baseY} L ${wL} ${baseY} Z`, isSliding: false })
        panels.push({ id: 'fixed-r', d: `M ${wR - qW} 100 L ${wR} 100 L ${wR} ${baseY} L ${wR - qW} ${baseY} Z`, isSliding: false })
        panels.push({ id: 'slide-l', d: `M ${wL + qW - 5} 102 L 200 102 L 200 ${baseY+2} L ${wL + qW - 5} ${baseY+2} Z`, isSliding: true, slideOffsetX: -wallW * 0.22 })
        panels.push({ id: 'slide-r', d: `M 200 102 L ${wR - qW + 5} 102 L ${wR - qW + 5} ${baseY+2} L 200 ${baseY+2} Z`, isSliding: true, slideOffsetX: wallW * 0.22 })
      } else if (doorSystem === '1-sabit-1-kayar') {
        const hW = wallW * 0.5
        panels.push({ id: 'fixed', d: `M ${wL} 100 L ${200} 100 L ${200} ${baseY} L ${wL} ${baseY} Z`, isSliding: false })
        panels.push({ id: 'slide', d: `M ${195} 102 L ${wR} 102 L ${wR} ${baseY+2} L ${195} ${baseY+2} Z`, isSliding: true, slideOffsetX: -wallW * 0.45 })
      } else if (doorSystem === 'katlanir') {
        const fold = getBiFoldPanels('fold', wL, 100, wR, 100, baseY, baseY, false)
        panels.push(...fold.panels)
        biFoldHandles.push(fold.handle)
      } else {
        panels.push({ id: 'all', d: `M ${wL} 100 L ${wR} 100 L ${wR} ${baseY} L ${wL} ${baseY} Z`, isSliding: false })
      }
    }
    else if (layout === 'walk-in') {
      panels.push({ id: 'fixed-walkin', d: `M ${wkL} 100 L ${wkR} 100 L ${wkR} ${baseY} L ${wkL} ${baseY} Z`, isSliding: false })
    }
    
    return panels
  }

  const panels = getPanels()

  // ─── HANDLES ───
  const renderHandles = () => {
    if (layout === 'walk-in' || handleType === 'none') return null
    let handlePositions = []
    
    const handleY = (100 + baseY) / 2
    
    if (doorSystem === 'katlanir') {
      handlePositions = biFoldHandles
    } else if (doorSystem === '2-sabit-2-kayar') {
      if (layout === 'corner') {
        handlePositions.push({ x: 142, y: handleY - 2, slideOffsetX: cSideDx * 0.45, slideOffsetY: cSideDy * 0.45 }) 
        handlePositions.push({ x: 158, y: handleY, slideOffsetX: cFrontW * 0.45, slideOffsetY: 0 })
      } else {
        handlePositions.push({ x: 185, y: handleY, slideOffsetX: -wallW * 0.22 })
        handlePositions.push({ x: 215, y: handleY, slideOffsetX: wallW * 0.22 })
      }
    } else if (doorSystem === '1-sabit-1-kayar') {
      if (layout === 'corner') {
        handlePositions.push({ x: cR - 20, y: handleY, slideOffsetX: -cFrontW * 0.45, slideOffsetY: 0 })
      } else {
        handlePositions.push({ x: wR - 20, y: handleY, slideOffsetX: -wallW * 0.45, slideOffsetY: 0 })
      }
    } else {
       // fallback
       handlePositions.push({ x: layout === 'corner' ? 235 : 200, y: (100 + baseY) / 2, slideOffsetX: 0 })
    }

    return handlePositions.map((pos, idx) => {
      const hx = pos.x
      const hy = pos.y
      
      let handleSvg = null
      if (handleType === 'nokta') {
        handleSvg = <circle cx={hx} cy={hy} r="4" fill={profileGrad} />
      } else if (handleType === 'plastik-dik') {
        // Plastik Dik Kulp: Simple solid color, slightly thicker, flat look
        const color = profileColor === 'black' ? '#333333' : (profileColor === 'white' ? '#f3f4f6' : (profileColor === 'gold' ? '#ccb266' : '#d1d5db'))
        handleSvg = <rect x={hx-2.5} y={hy-20} width="5" height="40" rx="1.5" fill={color} />
      } else if (handleType === 'metal-dik') {
        // Metal Dik Kulp: Metallic gradient, thinner profile
        handleSvg = <path d={`M ${hx-2} ${hy-22} L ${hx+2} ${hy-22} L ${hx+2} ${hy+22} L ${hx-2} ${hy+22} Z`} fill={profileGrad} />
      } else {
        // Fallback for safety
        handleSvg = <circle cx={hx} cy={hy} r="4" fill={profileGrad} />
      }
      
      return (
        <motion.g key={idx} animate={{ x: isHovered ? (pos.slideOffsetX || 0) : 0, y: isHovered ? (pos.slideOffsetY || 0) : 0 }} transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}>
          {handleSvg}
        </motion.g>
      )
    })
  }

  return (
    <div 
      className="w-full h-full flex items-center justify-center p-2 md:p-6 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <svg viewBox="0 0 400 440" className="w-full h-full overflow-visible">
        <defs>
          {patternUrl && (
            <pattern id="kumlama-pattern" patternUnits="userSpaceOnUse" width="400" height="400">
              <image href={patternUrl} x="0" y="0" width="400" height="400" preserveAspectRatio="xMidYMid slice" opacity="0.9" />
            </pattern>
          )}
          
          {/* Environment reflection map for glass */}
          <linearGradient id="glass-shine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.4" />
            <stop offset="25%" stopColor="white" stopOpacity="0.0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.05" />
            <stop offset="75%" stopColor="white" stopOpacity="0.0" />
            <stop offset="100%" stopColor="black" stopOpacity="0.2" />
          </linearGradient>

          {/* Premium Profile Metallic Gradients */}
          <linearGradient id="prof-chrome" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>
          <linearGradient id="prof-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="prof-black" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3f3f46" />
            <stop offset="50%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
          <linearGradient id="prof-white" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f3f4f6" />
            <stop offset="100%" stopColor="#e5e7eb" />
          </linearGradient>

          {/* Walls and Room Setup */}
          <linearGradient id="wall-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#080808" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <linearGradient id="wall-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#151515" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
          
          {/* Architectural Tile Grid Pattern */}
          <pattern id="tile-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1"/>
          </pattern>
        </defs>

        {/* ─── ROOM BACKGROUND (Walls & Floor Depth) ─── */}
        {layout === 'corner' ? (
          <g>
            <path d="M 0 40 L 150 40 L 150 400 L 0 400 Z" fill="url(#wall-left)" />
            <path d="M 0 40 L 150 40 L 150 400 L 0 400 Z" fill="url(#tile-grid)" />
            <path d="M 150 40 L 400 40 L 400 400 L 150 400 Z" fill="url(#wall-right)" />
            <path d="M 150 40 L 400 40 L 400 400 L 150 400 Z" fill="url(#tile-grid)" />
            {/* Corner seam */}
            <line x1="150" y1="40" x2="150" y2="400" stroke="rgba(0,0,0,0.5)" strokeWidth="4" />
          </g>
        ) : layout === 'wall-to-wall' ? (
          <g>
            {/* Left & Right solid pillars (Outside the shower, scales with width) */}
            <motion.path d={`M 0 40 L ${wL} 40 L ${wL} 400 L 0 400 Z`} fill="#0a0a0a" animate={{ d: `M 0 40 L ${wL} 40 L ${wL} 400 L 0 400 Z` }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
            <motion.path d={`M ${wR} 40 L 400 40 L 400 400 L ${wR} 400 Z`} fill="#0a0a0a" animate={{ d: `M ${wR} 40 L 400 40 L 400 400 L ${wR} 400 Z` }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
            
            {/* Back Wall (Inside shower) */}
            <motion.path d={`M ${wL} 40 L ${wR} 40 L ${wR} ${baseY} L ${wL} ${baseY} Z`} fill="url(#wall-right)" animate={{ d: `M ${wL} 40 L ${wR} 40 L ${wR} ${baseY} L ${wL} ${baseY} Z` }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
            <motion.path d={`M ${wL} 40 L ${wR} 40 L ${wR} ${baseY} L ${wL} ${baseY} Z`} fill="url(#tile-grid)" animate={{ d: `M ${wL} 40 L ${wR} 40 L ${wR} ${baseY} L ${wL} ${baseY} Z` }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
            
            {/* Floor (Inside shower) */}
            <motion.path d={`M ${wL} ${baseY} L ${wR} ${baseY} L ${wR} 400 L ${wL} 400 Z`} fill="#111" animate={{ d: `M ${wL} ${baseY} L ${wR} ${baseY} L ${wR} 400 L ${wL} 400 Z` }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
            
            {/* Wall corner seams */}
            <motion.line x1={wL} y1="40" x2={wL} y2="400" stroke="rgba(0,0,0,0.8)" strokeWidth="2" animate={{ x1: wL, x2: wL }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
            <motion.line x1={wR} y1="40" x2={wR} y2="400" stroke="rgba(0,0,0,0.8)" strokeWidth="2" animate={{ x1: wR, x2: wR }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
            <motion.line x1={wL} y1={baseY} x2={wR} y2={baseY} stroke="rgba(0,0,0,0.5)" strokeWidth="2" animate={{ x1: wL, x2: wR, y1: baseY, y2: baseY }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
          </g>
        ) : (
          <g>
            {/* Walk-in Room */}
            <motion.path d={`M 0 40 L 400 40 L 400 ${baseY} L 0 ${baseY} Z`} fill="url(#wall-right)" animate={{ d: `M 0 40 L 400 40 L 400 ${baseY} L 0 ${baseY} Z` }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
            <motion.path d={`M 0 40 L 400 40 L 400 ${baseY} L 0 ${baseY} Z`} fill="url(#tile-grid)" animate={{ d: `M 0 40 L 400 40 L 400 ${baseY} L 0 ${baseY} Z` }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
            <motion.path d={`M 0 ${baseY} L 400 ${baseY} L 400 400 L 0 400 Z`} fill="#111" animate={{ d: `M 0 ${baseY} L 400 ${baseY} L 400 400 L 0 400 Z` }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
            <motion.line x1="0" y1={baseY} x2="400" y2={baseY} stroke="rgba(0,0,0,0.5)" strokeWidth="2" animate={{ y1: baseY, y2: baseY }} transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }} />
          </g>
        )}

        {/* Dimension lines moved to end of file to prevent Z-index overlap */}

        {/* ─── BASE / TRAY ─── */}
        {tHeight === 0 ? (
          /* KUTU PROFİL (Floor Box Profile) */
          /* Note: Walk-in floor has no bottom profile (direct to floor) */
          layout !== 'walk-in' && baseType === 'floor-profile' && (
            <motion.path
              d={
                layout === 'corner' 
                  ? `M ${cLX} ${baseY + cSideDy} L 150 ${baseY} L ${cR} ${baseY}`
                  : `M ${wL} ${baseY} L ${wR} ${baseY}`
              }
              fill="none"
              stroke={profileGrad}
              strokeWidth="10"
              strokeLinecap="square"
              strokeLinejoin="round"
              animate={{ 
                d: layout === 'corner' 
                  ? `M ${cLX} ${baseY + cSideDy} L 150 ${baseY} L ${cR} ${baseY}`
                  : `M ${wL} ${baseY} L ${wR} ${baseY}`
              }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }}
            />
          )
        ) : (
          /* TEKNE / JAKUZİ (Solid Tray) */
          <>
            {basePolys.top && (
              <motion.path
                d={basePolys.top}
                fill={baseType === 'jacuzzi' || baseType === 'tub' ? '#EAEAEA' : '#F5F5F5'}
                animate={{ d: basePolys.top }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }}
              />
            )}
            {basePolys.front && (
              <motion.path
                d={basePolys.front}
                fill={baseType === 'jacuzzi' || baseType === 'tub' ? '#D4D4D4' : '#E5E5E5'}
                animate={{ d: basePolys.front }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }}
              />
            )}
            {basePolys.side && (
              <motion.path
                d={basePolys.side}
                fill={baseType === 'jacuzzi' || baseType === 'tub' ? '#C0C0C0' : '#D4D4D4'}
                animate={{ d: basePolys.side }}
                transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }}
              />
            )}
          </>
        )}

        {/* ─── GLASS PANELS (With Individual Frames & Hover Animation) ─── */}
        {panels.map((panel) => (
          <motion.g 
            key={panel.id} 
            initial={{ opacity: 0 }} 
            animate={{ 
              opacity: 1, 
              x: isHovered ? (panel.slideOffsetX || 0) : 0,
              y: isHovered ? (panel.slideOffsetY || 0) : 0
            }} 
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
          >
            {/* Panel Glass Fill */}
            <motion.path
              d={panel.d}
              fill={gColor}
              animate={{ d: panel.d, fill: gColor }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
            />
            
            {/* Frosted Pattern */}
            {glassType === 'frosted' && patternUrl && (
              <motion.path
                d={panel.d}
                fill="url(#kumlama-pattern)"
                style={{ mixBlendMode: 'screen' }}
                animate={{ d: panel.d }}
                transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
              />
            )}

            {/* Glass Shine */}
            <motion.path
              d={panel.d}
              fill="url(#glass-shine)"
              animate={{ d: panel.d }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
            />

            {/* Metallic Profile Frame around EACH panel (Thinner inner frames) */}
            <motion.path
              d={panel.d}
              fill="none"
              stroke={profileGrad}
              strokeWidth={panel.isSliding ? "2" : "3"}
              strokeLinejoin="round"
              animate={{ d: panel.d }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
            />
          </motion.g>
        ))}

        {/* ─── OUTER MAIN FRAME (Thick 4-Edge Profile) ─── */}
        {layout !== 'walk-in' && (
          <motion.path
            d={
              layout === 'corner' 
                ? `M ${cLX} ${cLY} L 150 90 L ${cR} 90 L ${cR} ${baseY} L 150 ${baseY} L ${cLX} ${baseY + cSideDy} Z`
                : `M ${wL} 100 L ${wR} 100 L ${wR} ${baseY} L ${wL} ${baseY} Z`
            }
            fill="none"
            stroke={profileGrad}
            strokeWidth="8"
            strokeLinejoin="round"
            strokeLinecap="round"
            animate={{ 
              d: layout === 'corner' 
                ? `M ${cLX} ${cLY} L 150 90 L ${cR} 90 L ${cR} ${baseY} L 150 ${baseY} L ${cLX} ${baseY + cSideDy} Z`
                : `M ${wL} 100 L ${wR} 100 L ${wR} ${baseY} L ${wL} ${baseY} Z`
            }}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.7 }}
          />
        )}

        {/* ─── HANDLES ─── */}
        {renderHandles()}

        {/* ─── DIMENSION LINES (Architectural Style) ─── */}
        <g stroke="#C9A86A" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8">
          {/* Width (X) Dimension */}
          <motion.path 
            d={
              layout === 'wall-to-wall' ? `M ${wL} 25 L ${wR} 25` : 
              layout === 'corner' ? `M 150 ${baseY + tHeight + 20} L ${cR} ${baseY + tHeight + 20}` : 
              `M ${wkL} 25 L ${wkR} 25`
            } 
            markerStart="url(#arrow)" markerEnd="url(#arrow)" 
            animate={{ 
              d: layout === 'wall-to-wall' ? `M ${wL} 25 L ${wR} 25` : 
                 layout === 'corner' ? `M 150 ${baseY + tHeight + 20} L ${cR} ${baseY + tHeight + 20}` : 
                 `M ${wkL} 25 L ${wkR} 25`
            }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
          />
          
          {/* X Value Text */}
          <motion.text 
            x={layout === 'walk-in' ? 200 : layout === 'corner' ? 150 + cFrontW / 2 : 200} 
            y={layout === 'corner' ? baseY + tHeight + 10 : 15} 
            dy=".3em"
            fill="#FFF" 
            fontSize="15" 
            fontWeight="bold" 
            textAnchor="middle"
            stroke="none"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
            animate={{ 
              x: layout === 'walk-in' ? 200 : layout === 'corner' ? 150 + cFrontW / 2 : 200,
              y: layout === 'corner' ? baseY + tHeight + 10 : 15
            }}
          >
            {widthX} cm
          </motion.text>

          {/* Depth (Y) Dimension (Only for Corner) */}
          {layout === 'corner' && (
             <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <motion.path 
                 d={`M ${cLX - 15} ${baseY + cSideDy + tHeight + 20} L ${150 - 15} ${baseY + tHeight + 20}`} 
                 markerStart="url(#arrow)" markerEnd="url(#arrow)" 
                 animate={{ d: `M ${cLX - 15} ${baseY + cSideDy + tHeight + 20} L ${150 - 15} ${baseY + tHeight + 20}` }}
                 transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
               />
               <motion.text 
                 x={(cLX + 150) / 2 - 25} 
                 y={baseY + cSideDy / 2 + tHeight + 10} 
                 dy=".3em"
                 fill="#FFF" 
                 fontSize="15" 
                 fontWeight="bold" 
                 textAnchor="middle" 
                 stroke="none"
                 style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                 animate={{ 
                   x: (cLX + 150) / 2 - 25,
                   y: baseY + cSideDy / 2 + tHeight + 10
                 }}
               >
                 {depthY} cm
               </motion.text>
             </motion.g>
          )}

          {/* Marker definition for arrows */}
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#C9A86A" stroke="none" />
          </marker>
        </g>

      </svg>
      
      {/* Animated Hint for Hover interaction */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-md border border-white/10 text-white/70 text-xs px-3 py-1.5 rounded-full pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 10 : 0 }}
        transition={{ duration: 0.3 }}
      >
        Kapıyı açmak için fareyle üzerine gelin
      </motion.div>
    </div>
  )
}
