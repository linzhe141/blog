'use client'
import { useRef, RefCallback, useEffect } from 'react'
import mediumZoom, { Zoom } from 'medium-zoom'
import Image, { type ImageProps } from 'next/image'
import { useToggleTheme } from '@/hooks/useToggleTheme'

export function ZoomImage(props: ImageProps) {
  const { theme } = useToggleTheme()
  const zoomRef = useRef<Zoom | null>(null)

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom()
    }
    return zoomRef.current
  }

  const attachZoom: RefCallback<HTMLImageElement> = (node) => {
    const zoom = getZoom()

    if (node) {
      zoom.attach(node)
    } else {
      zoom.detach()
    }
  }
  useEffect(() => {
    if (!theme) return

    const background =
      theme === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.8)'

    if (zoomRef.current) {
      zoomRef.current.update({ background })
    } else {
      zoomRef.current = mediumZoom({ background })
    }
  }, [theme])
  return <Image {...props} ref={attachZoom} />
}
