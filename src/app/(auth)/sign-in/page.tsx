

import type React from "react"

import LoginForm from '@/components/auth/loginForm'
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function HomePage() {
    const session = await auth()
    if (session) redirect("/dashboard")
    return (
        <div className="min-h-screen bg-[#fdf2e3]">
            <div className="w-full flex justify-center  content-center p-6">
                <LoginForm/>
            </div>
        </div>
    )
}



