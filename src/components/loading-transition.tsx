"use client"

import { motion } from "framer-motion"

export default function LoadingTransition() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center"
      >
        <div className="h-16 w-16 rounded-full bg-[#c83e3e] flex items-center justify-center text-white font-bold text-2xl">
          C
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 1, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
          className="h-1 bg-[#c83e3e] mt-4 rounded-full"
        />
      </motion.div>
    </motion.div>
  )
}

