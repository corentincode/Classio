import type { Metadata } from "next"
import DocumentsContent from "@/components/dashboard/documents-content"

export const metadata: Metadata = {
  title: "Documents | Classio Dashboard",
  description: "Gérez tous vos documents pédagogiques",
}

export default function DocumentsPage() {
  return <DocumentsContent />
}

