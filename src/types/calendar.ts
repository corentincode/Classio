export type EventType = "cours" | "reunion" | "examen" | "evenement" | "conge" | "autre"

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start: Date
  end: Date
  allDay?: boolean
  type: EventType
  location?: string
  participants?: string[]
  color?: string
  recurrence?: {
    frequency: "daily" | "weekly" | "monthly" | "yearly"
    interval: number
    endDate?: Date
    count?: number
  }
}

export interface CalendarDay {
  date: Date
  events: CalendarEvent[]
  isCurrentMonth: boolean
  isToday: boolean
}

export interface CalendarWeek {
  days: CalendarDay[]
}

export interface CalendarMonth {
  weeks: CalendarWeek[]
}

export interface TimeSlot {
  start: string
  end: string
}

export interface DaySchedule {
  date: Date
  timeSlots: TimeSlot[]
  events: CalendarEvent[]
}
