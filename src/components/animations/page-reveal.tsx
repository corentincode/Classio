"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface PageRevealProps {
  children: ReactNode
}

// Version simplifiée qui ne fait qu'un simple fade
export default function PageReveal({ children }: PageRevealProps) {
  return (
    <motion.div initial={{ opacity: 0.9 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
      {children}
    </motion.div>
  )
}

