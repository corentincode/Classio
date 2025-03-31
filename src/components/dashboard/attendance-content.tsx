"use client"

import { useState } from "react"
import { Bell, Calendar, ChevronLeft, ChevronRight, Download, Filter, Plus, Search, Users } from "lucide-react"
import { format, addDays, subDays, startOfWeek, endOfWeek, eachDayOfInterval, isToday, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import FadeIn from "@/components/animations/fade-in"
import AttendanceTable from "./attendance-table"
import AttendanceSummary from "./attendance-summary"
import RecordAttendanceDialog from "./record-attendance-dialog"

// Données fictives pour les classes
const classes = [
  { id: "1", name: "6ème A", count: 28 },
  { id: "2", name: "5ème B", count: 30 },
  { id: "3", name: "4ème A", count: 26 },
  { id: "4", name: "3ème C", count: 29 },
  { id: "5", name: "2nde D", count: 32 },
]

export default function AttendanceContent() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("today")
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false)

  // Calculer les jours de la semaine actuelle
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }) // Semaine commence le lundi
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Navigation des dates
  const goToPreviousDay = () => setSelectedDate(subDays(selectedDate, 1))
  const goToNextDay = () => setSelectedDate(addDays(selectedDate, 1))
  const goToToday = () => setSelectedDate(new Date())

  // Navigation des semaines
  const goToPreviousWeek = () => setSelectedDate(subDays(selectedDate, 7))
  const goToNextWeek = () => setSelectedDate(addDays(selectedDate, 7))

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#f5f0e8] bg-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold">Présences et retards</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un élève..."
                className="w-64 rounded-lg border border-[#f5f0e8] bg-white py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#c83e3e]"
              />
            </div>

            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c83e3e] text-[10px] text-white">
                3
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <TabsList className="bg-[#f5f0e8]/50">
              <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
              <TabsTrigger value="week">Semaine</TabsTrigger>
              <TabsTrigger value="month">Mois</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Exporter</span>
              </Button>
              <Button
                size="sm"
                className="gap-1 bg-[#c83e3e] hover:bg-[#b53535]"
                onClick={() => setIsRecordDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span>Saisir présences</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-64 space-y-4">
              <div className="font-medium">Classes</div>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${selectedClass === null ? "bg-[#f5f0e8]/50 text-[#c83e3e]" : ""}`}
                  onClick={() => setSelectedClass(null)}
                >
                  Toutes les classes
                </Button>
                {classes.map((cls) => (
                  <Button
                    key={cls.id}
                    variant="ghost"
                    className={`w-full justify-start ${selectedClass === cls.id ? "bg-[#f5f0e8]/50 text-[#c83e3e]" : ""}`}
                    onClick={() => setSelectedClass(cls.id)}
                  >
                    {cls.name} ({cls.count})
                  </Button>
                ))}
              </div>

              <div className="pt-4">
                <div className="font-medium mb-2">Filtres</div>
                <div className="space-y-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Statut de présence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="present">Présent</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="late">En retard</SelectItem>
                      <SelectItem value="excused">Absence justifiée</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select defaultValue="all">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Période" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toute la journée</SelectItem>
                      <SelectItem value="morning">Matin</SelectItem>
                      <SelectItem value="afternoon">Après-midi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="mt-6">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Résumé du jour
                  </h3>
                  <AttendanceSummary />
                </CardContent>
              </Card>
            </div>

            <div className="flex-1">
              <TabsContent value="today" className="m-0">
                <FadeIn>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={goToPreviousDay}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={isToday(selectedDate) ? "default" : "outline"}
                        className={isToday(selectedDate) ? "bg-[#c83e3e] hover:bg-[#b53535]" : ""}
                        onClick={goToToday}
                      >
                        Aujourd'hui
                      </Button>
                      <Button variant="outline" size="icon" onClick={goToNextDay}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <span className="font-medium ml-2">
                        {format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Journée complète</span>
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <AttendanceTable date={selectedDate} classId={selectedClass} />
                </FadeIn>
              </TabsContent>

              <TabsContent value="week" className="m-0">
                <FadeIn>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={goToToday}>
                        Cette semaine
                      </Button>
                      <Button variant="outline" size="icon" onClick={goToNextWeek}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <span className="font-medium ml-2">
                        {format(weekStart, "d MMM", { locale: fr })} - {format(weekEnd, "d MMM yyyy", { locale: fr })}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {weekDays.map((day) => (
                      <Card key={day.toString()} className={isSameDay(day, selectedDate) ? "border-[#c83e3e]" : ""}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">{format(day, "EEEE d MMMM", { locale: fr })}</h3>
                            <Badge
                              variant={isSameDay(day, new Date()) ? "default" : "outline"}
                              className={isSameDay(day, new Date()) ? "bg-[#c83e3e]" : ""}
                            >
                              {isSameDay(day, new Date()) ? "Aujourd'hui" : ""}
                            </Badge>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-center"
                            onClick={() => {
                              setSelectedDate(day)
                              setActiveTab("today")
                            }}
                          >
                            Voir les détails
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </FadeIn>
              </TabsContent>

              <TabsContent value="month" className="m-0">
                <FadeIn>
                  <div className="flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-[#c83e3e] opacity-20" />
                    <div className="ml-4 text-center">
                      <h3 className="text-lg font-medium">Vue mensuelle</h3>
                      <p className="text-sm text-gray-500">
                        Consultez les tendances mensuelles de présence et d'absence
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </TabsContent>

              <TabsContent value="history" className="m-0">
                <FadeIn>
                  <div className="flex items-center justify-center">
                    <Calendar className="h-16 w-16 text-[#c83e3e] opacity-20" />
                    <div className="ml-4 text-center">
                      <h3 className="text-lg font-medium">Historique des présences</h3>
                      <p className="text-sm text-gray-500">Consultez l'historique complet des présences et absences</p>
                    </div>
                  </div>
                </FadeIn>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </main>

      <RecordAttendanceDialog
        open={isRecordDialogOpen}
        onOpenChange={setIsRecordDialogOpen}
        date={selectedDate}
        classes={classes}
      />
    </div>
  )
}

