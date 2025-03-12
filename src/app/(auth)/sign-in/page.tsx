import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import LoginForm from "@/components/auth/loginForm"
import Header from "@/components/sections/header"
import Footer from "@/components/sections/footer"

export default async function LoginPage() {
  const session = await auth()
  if (session) redirect("/dashboard")

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-gradient-to-b from-white to-[#f5f0e8]/30">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}

