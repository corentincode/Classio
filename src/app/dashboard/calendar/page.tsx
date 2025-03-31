import PageReveal from "@/components/animations/page-reveal"
import CalendarContent from "@/components/dashboard/calendar-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calendrier | Classio",
  description: "Gérez votre emploi du temps et vos événements avec le calendrier Classio",
}

export default function CalendarPage() {
  return (
    <PageReveal>
      <CalendarContent />
    </PageReveal>
  )
}

