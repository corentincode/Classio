"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import {Card, CardContent} from "@/components/ui/card";

export default function HomePage() {

    return (
        <div className="min-h-screen bg-[#fdf2e3]">
            <div className="w-full flex justify-center  content-center p-6">
                <FormCard/>
            </div>
        </div>
    )
}

function FormCard() {
    return (
        <Card className="w-200 group border-[#921600]/10 transition-all ease-in-out duration-350  hover:border-[#921600]/30 hover:shadow-lg">
            <CardContent className="p-6"  >
                yo
            </CardContent>
        </Card>
    )
}

