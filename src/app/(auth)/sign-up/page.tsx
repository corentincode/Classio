"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import {Card, CardContent} from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"


export default function HomePage() {

    return (
        <div className="min-h-screen bg-[#fdf2e3]">
            <div className="w-full min-h-screen flex justify-center items-center content-center p-6">
                <FormCard/>
            </div>
        </div>
    )
}

function FormCard() {
    return (
        <Card className=" flex justify-center items-center group border-[#921600]/10 transition-all ease-in-out duration-350  hover:border-[#921600]/30 hover:shadow-lg">
            <CardContent className="p-6"  >
                <h4 className='text-3xl font-bold'>Se connecter</h4>
                <p className="mt-0 text-gray-500 mb-5">Connecter vous avec votre addesse email Classio </p>
                <ul className="gap-4 flex flex-col">
                    <li>
                        <Label htmlFor="terms" className="mb-3">Email :</Label>
                        <Input type="email" placeholder="Email" className="w-100"/>
                    </li>
                    <li>
                        <Label htmlFor="terms" className="mb-3">Password :</Label>
                        <Input type="password" placeholder="Password" className="w-100"/>
                    </li>
                </ul>
                <Button className='mt-4'>Envoyer</Button>
            </CardContent>
        </Card>
    )
}

