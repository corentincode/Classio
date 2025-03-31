"use client"

import { useState } from "react"
import { CheckCircle, XCircle, Clock, AlertCircle, MoreHorizontal } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

// Types pour les données d'élèves
type AttendanceStatus = "present" | "absent" | "late" | "excused"

type AttendancePeriod = {
  morning: AttendanceStatus
  afternoon: AttendanceStatus
}

type Student = {
  id: string
  name: string
  class: string
  attendance: AttendancePeriod
  notes?: string
}

// Données fictives pour les élèves
const studentsData: Student[] = [
  {
    id: "1",
    name: "Emma Martin",
    class: "6ème A",
    attendance: { morning: "present", afternoon: "present" },
  },
  {
    id: "2",
    name: "Lucas Dubois",
    class: "6ème A",
    attendance: { morning: "present", afternoon: "late" },
    notes: "Retard de 15 minutes l'après-midi",
  },
  {
    id: "3",
    name: "Chloé Bernard",
    class: "6ème A",
    attendance: { morning: "absent", afternoon: "absent" },
    notes: "Rendez-vous médical",
  },
  {
    id: "4",
    name: "Nathan Petit",
    class: "5ème B",
    attendance: { morning: "present", afternoon: "present" },
  },
  {
    id: "5",
    name: "Léa Durand",
    class: "5ème B",
    attendance: { morning: "excused", afternoon: "excused" },
    notes: "Absence justifiée par un certificat médical",
  },
  {
    id: "6",
    name: "Hugo Moreau",
    class: "4ème A",
    attendance: { morning: "present", afternoon: "present" },
  },
  {
    id: "7",
    name: "Manon Lefebvre",
    class: "4ème A",
    attendance: { morning: "late", afternoon: "present" },
    notes: "Retard de 10 minutes le matin",
  },
  {
    id: "8",
    name: "Théo Roux",
    class: "3ème C",
    attendance: { morning: "present", afternoon: "absent" },
    notes: "Départ anticipé pour rendez-vous orthodontiste",
  },
]

// Fonction pour obtenir l'icône et la couleur en fonction du statut
function getStatusIcon(status: AttendanceStatus) {
  switch (status) {
    case "present":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "absent":
      return <XCircle className="h-4 w-4 text-red-500" />
    case "late":
      return <Clock className="h-4 w-4 text-amber-500" />
    case "excused":
      return <AlertCircle className="h-4 w-4 text-blue-500" />
  }
}

// Fonction pour obtenir le texte du statut
function getStatusText(status: AttendanceStatus) {
  switch (status) {
    case "present":
      return "Présent"
    case "absent":
      return "Absent"
    case "late":
      return "En retard"
    case "excused":
      return "Justifié"
  }
}

// Fonction pour obtenir la couleur du badge
function getStatusBadgeVariant(status: AttendanceStatus): "default" | "outline" | "destructive" | "secondary" {
  switch (status) {
    case "present":
      return "outline"
    case "absent":
      return "destructive"
    case "late":
      return "outline" // Changé de "warning" à "outline"
    case "excused":
      return "secondary"
    default:
      return "default"
  }
}

interface AttendanceTableProps {
  date: Date
  classId: string | null
}

export default function AttendanceTable({ date, classId }: AttendanceTableProps) {
  // Filtrer les élèves par classe si une classe est sélectionnée
  const filteredStudents = classId
    ? studentsData.filter((student) => student.class.startsWith(classId.charAt(0)))
    : studentsData

  // État pour le tri
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Fonction pour changer le tri
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Trier les élèves
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    let comparison = 0

    if (sortColumn === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortColumn === "class") {
      comparison = a.class.localeCompare(b.class)
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("name")}>
              Élève
              {sortColumn === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("class")}>
              Classe
              {sortColumn === "class" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
            </TableHead>
            <TableHead>Matin</TableHead>
            <TableHead>Après-midi</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>
                <Badge
                  variant={getStatusBadgeVariant(student.attendance.morning)}
                  className={`flex w-24 items-center justify-center gap-1 ${
                    student.attendance.morning === "late" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : ""
                  }`}
                >
                  {getStatusIcon(student.attendance.morning)}
                  <span>{getStatusText(student.attendance.morning)}</span>
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={getStatusBadgeVariant(student.attendance.afternoon)}
                  className={`flex w-24 items-center justify-center gap-1 ${
                    student.attendance.afternoon === "late" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : ""
                  }`}
                >
                  {getStatusIcon(student.attendance.afternoon)}
                  <span>{getStatusText(student.attendance.afternoon)}</span>
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-500">{student.notes || "-"}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Modifier le statut</DropdownMenuItem>
                    <DropdownMenuItem>Ajouter une note</DropdownMenuItem>
                    <DropdownMenuItem>Contacter les parents</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

