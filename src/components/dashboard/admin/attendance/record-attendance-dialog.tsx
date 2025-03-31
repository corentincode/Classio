"use client"

import { useState } from "react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Types pour les données
type AttendanceStatus = "present" | "absent" | "late" | "excused"
type ClassType = {
  id: string
  name: string
  count: number
}

// Données fictives pour les élèves
const studentsData = [
  { id: "1", name: "Emma Martin", class: "6ème A" },
  { id: "2", name: "Lucas Dubois", class: "6ème A" },
  { id: "3", name: "Chloé Bernard", class: "6ème A" },
  { id: "4", name: "Nathan Petit", class: "5ème B" },
  { id: "5", name: "Léa Durand", class: "5ème B" },
  { id: "6", name: "Hugo Moreau", class: "4ème A" },
  { id: "7", name: "Manon Lefebvre", class: "4ème A" },
  { id: "8", name: "Théo Roux", class: "3ème C" },
]

interface RecordAttendanceDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: Date
  classes: ClassType[]
}

export default function RecordAttendanceDialog({ open, onOpenChange, date, classes }: RecordAttendanceDialogProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [period, setPeriod] = useState("morning")
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceStatus>>({})

  // Filtrer les élèves par classe
  const filteredStudents = selectedClass
    ? studentsData.filter((student) => student.class.startsWith(selectedClass.charAt(0)))
    : []

  // Mettre à jour le statut de présence d'un élève
  const updateAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: status,
    }))
  }

  // Obtenir le statut actuel d'un élève
  const getStudentStatus = (studentId: string): AttendanceStatus => {
    return attendanceData[studentId] || "present"
  }

  // Marquer tous les élèves avec le même statut
  const markAllStudents = (status: AttendanceStatus) => {
    const newData: Record<string, AttendanceStatus> = {}
    filteredStudents.forEach((student) => {
      newData[student.id] = status
    })
    setAttendanceData(newData)
  }

  // Réinitialiser le formulaire
  const resetForm = () => {
    setSelectedClass(null)
    setPeriod("morning")
    setAttendanceData({})
  }

  // Soumettre le formulaire
  const handleSubmit = () => {
    // Ici, vous enverriez les données au serveur
    console.log("Données soumises:", {
      date: format(date, "yyyy-MM-dd"),
      period,
      class: selectedClass,
      attendance: attendanceData,
    })

    // Fermer le dialogue et réinitialiser
    onOpenChange(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Saisir les présences</DialogTitle>
          <DialogDescription>{format(date, "EEEE d MMMM yyyy", { locale: fr })}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Classe</Label>
              <Select value={selectedClass || ""} onValueChange={setSelectedClass}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Sélectionner une classe" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name} ({cls.count} élèves)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Période</Label>
              <Tabs value={period} onValueChange={setPeriod} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="morning">Matin</TabsTrigger>
                  <TabsTrigger value="afternoon">Après-midi</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {selectedClass && (
            <>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-1" onClick={() => markAllStudents("present")}>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Tous présents</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1" onClick={() => markAllStudents("absent")}>
                  <XCircle className="h-4 w-4 text-red-500" />
                  <span>Tous absents</span>
                </Button>
              </div>

              <div className="max-h-[300px] overflow-y-auto border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Élève</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              getStudentStatus(student.id) === "present"
                                ? "outline"
                                : getStudentStatus(student.id) === "absent"
                                  ? "destructive"
                                  : getStudentStatus(student.id) === "late"
                                    ? "warning"
                                    : "secondary"
                            }
                            className="flex w-24 items-center justify-center gap-1"
                          >
                            {getStudentStatus(student.id) === "present" && (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            )}
                            {getStudentStatus(student.id) === "absent" && <XCircle className="h-4 w-4 text-red-500" />}
                            {getStudentStatus(student.id) === "late" && <Clock className="h-4 w-4 text-amber-500" />}
                            {getStudentStatus(student.id) === "excused" && (
                              <AlertCircle className="h-4 w-4 text-blue-500" />
                            )}
                            <span>
                              {getStudentStatus(student.id) === "present" && "Présent"}
                              {getStudentStatus(student.id) === "absent" && "Absent"}
                              {getStudentStatus(student.id) === "late" && "En retard"}
                              {getStudentStatus(student.id) === "excused" && "Justifié"}
                            </span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateAttendance(student.id, "present")}
                            >
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateAttendance(student.id, "absent")}
                            >
                              <XCircle className="h-4 w-4 text-red-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateAttendance(student.id, "late")}
                            >
                              <Clock className="h-4 w-4 text-amber-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateAttendance(student.id, "excused")}
                            >
                              <AlertCircle className="h-4 w-4 text-blue-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#c83e3e] hover:bg-[#b53535]"
            disabled={!selectedClass || Object.keys(attendanceData).length === 0}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

