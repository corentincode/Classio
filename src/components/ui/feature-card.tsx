"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-xl border border-[#f5f0e8] bg-white p-6 shadow-sm group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0e8] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 space-y-2">
        <div className="p-2 bg-[#f5f0e8] rounded-lg inline-block">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

