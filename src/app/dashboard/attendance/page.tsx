import PageReveal from "@/components/animations/page-reveal"
import AttendanceContent from "@/components/dashboard/attendance-content"

export const metadata = {
  title: "Présences et retards | Classio",
  description: "Gérez les présences, absences et retards des élèves",
}

export default function AttendancePage() {
  return (
    <PageReveal>
      <AttendanceContent />
    </PageReveal>
  )
}

