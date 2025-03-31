import type { Metadata } from "next"
import PageReveal from "@/components/animations/page-reveal"
import UsersContent from "@/components/dashboard/admin/users/users-content"

export const metadata: Metadata = {
  title: "Utilisateurs | Classio",
  description: "Gérez les utilisateurs de votre établissement",
}

export default function UsersPage() {
  return (
    <PageReveal>
      <UsersContent />
    </PageReveal>
  )
}
