"use client"

import { useEffect } from "react"
import { signOut } from "next-auth/react"

export default function SignOut() {
  useEffect(() => {
    signOut({ callbackUrl: "/" })
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Signing out...</p>
    </div>
  )
}

