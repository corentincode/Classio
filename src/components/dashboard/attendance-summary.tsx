"use client"

import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Données fictives pour le résumé des présences
const summaryData = {
  total: 145,
  present: 128,
  absent: 8,
  late: 6,
  excused: 3,
}

export default function AttendanceSummary() {
  const presentPercentage = Math.round((summaryData.present / summaryData.total) * 100)
  const absentPercentage = Math.round((summaryData.absent / summaryData.total) * 100)
  const latePercentage = Math.round((summaryData.late / summaryData.total) * 100)
  const excusedPercentage = Math.round((summaryData.excused / summaryData.total) * 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>Présents</span>
        </div>
        <div className="font-medium">
          {summaryData.present} ({presentPercentage}%)
        </div>
      </div>
      <Progress
        value={presentPercentage}
        className="h-1.5 bg-gray-100"
        // Suppression de indicatorClassName
      />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <XCircle className="h-4 w-4 text-red-500" />
          <span>Absents</span>
        </div>
        <div className="font-medium">
          {summaryData.absent} ({absentPercentage}%)
        </div>
      </div>
      <Progress value={absentPercentage} className="h-1.5 bg-gray-100" />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-amber-500" />
          <span>En retard</span>
        </div>
        <div className="font-medium">
          {summaryData.late} ({latePercentage}%)
        </div>
      </div>
      <Progress value={latePercentage} className="h-1.5 bg-gray-100" />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <span>Justifiés</span>
        </div>
        <div className="font-medium">
          {summaryData.excused} ({excusedPercentage}%)
        </div>
      </div>
      <Progress value={excusedPercentage} className="h-1.5 bg-gray-100" />

      <div className="mt-2 pt-2 border-t text-sm flex justify-between">
        <span>Total</span>
        <span className="font-medium">{summaryData.total} élèves</span>
      </div>
    </div>
  )
}

