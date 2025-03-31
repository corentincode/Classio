export type EventType = "class" | "meeting" | "event" | "exam" | "holiday"

export interface Event {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  location: string
  description: string
  type: EventType
  classId?: string
  classIds?: string[]
  teacherId?: string
  participants?: string[]
}

