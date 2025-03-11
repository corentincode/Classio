"use client";
import { useRouter } from "next/navigation";

export default function NavItem({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push(href)}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-gray-700 transition-all hover:bg-[#921600] hover:text-white"
        >
            <span className="transition-transform group-hover:scale-110">{icon}</span>
            <span>{label}</span>
        </button>
    );
}
