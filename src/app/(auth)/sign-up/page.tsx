"use client"

import React, {useEffect, useState} from "react"

import FormCard from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        // Vérifier l'authentification côté client
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/session")
                const session = await res.json()

                if (session || session.user) {
                    console.log("ddsdsddsds")
                    router.push("/");
                } else {
                    router.push("/sign-up");
                }
            } catch (error) {
                console.error("Erreur lors de la vérification de l'authentification:", error)
            }
        }

        checkAuth()
    }, [])

    return (
        <div className="min-h-screen bg-[#fdf2e3]">
            <div className="w-full min-h-screen flex justify-center items-center content-center p-6">
                <FormCard/>
            </div>
        </div>
    )
}


