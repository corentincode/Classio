"use client"

import { type ReactNode, useState, useEffect } from "react"
import { motion, type MotionProps } from "framer-motion"

interface SafeMotionProps extends MotionProps {
  children: ReactNode
  fallbackTime?: number
}

export default function SafeMotion({ children, fallbackTime = 300, ...props }: SafeMotionProps) {
  const [showFallback, setShowFallback] = useState(false)

  // Si l'animation prend trop de temps, afficher le contenu sans animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true)
    }, fallbackTime)

    return () => clearTimeout(timer)
  }, [fallbackTime])

  if (showFallback) {
    return <div>{children}</div>
  }

  return <motion.div {...props}>{children}</motion.div>
}

