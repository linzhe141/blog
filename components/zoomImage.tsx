'use client'
import { useRef, ComponentProps, RefCallback } from 'react'
import mediumZoom, { Zoom, ZoomOptions } from 'medium-zoom'
import Image, { type ImageProps } from 'next/image'

export function ZoomImage(props: ImageProps) {
  const zoomRef = useRef<Zoom | null>(null)

  function getZoom() {
    if (zoomRef.current === null) {
      zoomRef.current = mediumZoom({
        background: 'rgba(255,255,255,0.7)',
      })
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

  return <Image {...props} ref={attachZoom} />
}
