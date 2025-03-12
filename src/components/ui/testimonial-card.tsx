"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
  imageSrc?: string
}

export default function TestimonialCard({ quote, author, role, rating, imageSrc }: TestimonialCardProps) {
  return (
    <motion.div
      variants={fadeIn}
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-xl border border-[#f5f0e8] bg-white p-6 shadow-sm group"
    >
      <div className="absolute top-0 right-0 h-24 w-24 bg-[#f5f0e8] rounded-bl-full"></div>
      <div className="space-y-4 relative z-10">
        {imageSrc && (
          <div className="h-12 w-12 rounded-full overflow-hidden mb-4">
            <Image src={imageSrc || "/placeholder.svg"} alt={author} width={48} height={48} className="object-cover" />
          </div>
        )}
        <div className="flex">
          {Array(rating)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#c83e3e] text-[#c83e3e]" />
            ))}
          {Array(5 - rating)
            .fill(0)
            .map((_, i) => (
              <Star key={i} className="h-4 w-4 text-gray-300" />
            ))}
        </div>
        <p className="italic text-gray-600">"{quote}"</p>
        <div className="pt-2 border-t border-[#f5f0e8]">
          <p className="font-medium">{author}</p>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

