"use client"

import React, {useEffect, useState} from "react"

import FormCard from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";

export default function HomePage() {


    return (
        <div className="min-h-screen bg-[#fdf2e3]">
            <div className="w-full min-h-screen flex justify-center items-center content-center p-6">
                <FormCard/>
            </div>
        </div>
    )
}


