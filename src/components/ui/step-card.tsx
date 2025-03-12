"use client"

import { motion } from "framer-motion"

interface StepCardProps {
  number: string
  title: string
  description: string
  isLeft: boolean
}

export default function StepCard({ number, title, description, isLeft }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center ${isLeft ? "justify-end" : "justify-start"}`}
    >
      <div className={`w-full md:w-5/12 ${isLeft ? "text-right md:pr-12" : "md:pl-12"}`}>
        <div className="space-y-2">
          <div className="inline-flex items-center rounded-full border border-[#c83e3e]/20 bg-[#f5f0e8] px-3 py-1 text-xs font-medium text-[#c83e3e]">
            Étape {number}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="absolute left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#c83e3e] text-white"
      >
        {number}
      </motion.div>
    </motion.div>
  )
}

