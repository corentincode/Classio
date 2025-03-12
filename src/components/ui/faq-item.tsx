"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

interface FaqItemProps {
  question: string
  answer: string
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div variants={fadeIn} className="border border-[#f5f0e8] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-[#f5f0e8]/50 transition-colors"
      >
        <span className="font-medium">{question}</span>
        <ChevronRight className={`h-5 w-5 text-[#c83e3e] transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-4 pt-0 text-gray-600">{answer}</div>
      </motion.div>
    </motion.div>
  )
}

