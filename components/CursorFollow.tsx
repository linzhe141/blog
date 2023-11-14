'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
export default function CursorFollow() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
    },
  }
  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[2] h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-40 blur-[20px]`}
      variants={variants}
      animate='default'
      transition={{
        x: {
          duration: 0.3,
          ease: 'linear',
          repeat: 0,
          type: 'spring',
          stiffness: 80,
        },
        y: {
          duration: 0.3,
          ease: 'linear',
          repeat: 0,
          type: 'spring',
          stiffness: 80,
        },
        default: {
          duration: 2.5,
          repeat: Infinity,
        },
      }}
    ></motion.div>
  )
}
