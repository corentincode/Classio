"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  // Variantes d'animation simplifiées et plus légères
  const variants = {
    initial: { opacity: 0.9 },
    animate: { opacity: 1 },
    exit: { opacity: 0.9 },
  }

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.2 }} // Durée très courte pour éviter les problèmes
      className="min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  )
}

