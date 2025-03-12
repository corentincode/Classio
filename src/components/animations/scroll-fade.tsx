"use client"

import type { ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface ScrollFadeProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right" | "none"
  once?: boolean
}

export default function ScrollFade({
  children,
  delay = 0,
  className = "",
  direction = "up",
  once = true,
}: ScrollFadeProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.2 })

  // Valeurs initiales réduites pour des animations plus subtiles
  const getInitialY = () => {
    switch (direction) {
      case "up":
        return 20
      case "down":
        return -20
      default:
        return 0
    }
  }

  const getInitialX = () => {
    switch (direction) {
      case "left":
        return 20
      case "right":
        return -20
      default:
        return 0
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: getInitialY(), x: getInitialX() }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: getInitialY(), x: getInitialX() }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

