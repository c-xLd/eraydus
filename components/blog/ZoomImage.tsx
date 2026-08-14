'use client'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { ReactNode } from 'react'

export default function ZoomImage({ children }: { children: ReactNode }) {
  return <Zoom>{children}</Zoom>
}
