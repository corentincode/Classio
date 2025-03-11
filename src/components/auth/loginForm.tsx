"use client"
import { useState } from "react";
import { useRouter } from "next/navigation"
import {signIn} from "next-auth/react";
import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React from "react";

export default function LoginForm() {
    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        setError(null)

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError("Identifiants invalides")
                setIsLoading(false)
                return
            }

            router.push("/dashboard")
            router.refresh()
        } catch (error) {
            setError("Une erreur s'est produite lors de la connexion")
            setIsLoading(false)
        }

    }


    return (
        <Card className=" flex justify-center items-center group border-[#921600]/10 transition-all ease-in-out duration-350  hover:border-[#921600]/30 hover:shadow-lg">
            <CardContent className="p-6 pt-0"  >
                <Image
                    src="/test.png"
                    alt="Classio Logo"
                    width={200}
                    height={40}
                    className="h-auto w-auto mx-auto"
                />
                <h4 className='text-3xl font-bold'>Se connecter</h4>
                <p className="mt-0 text-gray-500 mb-5">Connecter vous avec votre addesse email Classio </p>
                <form onSubmit={handleSubmit}>
                    <Input placeholder='Email' type='email' name='email'onChange={(e) => setEmail(e.target.value)}
                           value={email}/>
                    <Input placeholder='Password' type='password' name='password' onChange={(e) => setPassword(e.target.value)}
                           value={password}/>
                    <Button className='mt-4' type='submit'>Envoyer</Button>
                </form>
            </CardContent>
        </Card>
    )
}