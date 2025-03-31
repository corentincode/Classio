"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Lun", taux: 95 },
  { date: "Mar", taux: 97 },
  { date: "Mer", taux: 94 },
  { date: "Jeu", taux: 98 },
  { date: "Ven", taux: 91 },
  { date: "Lun", taux: 93 },
  { date: "Mar", taux: 95 },
  { date: "Mer", taux: 89 },
  { date: "Jeu", taux: 92 },
  { date: "Ven", taux: 94 },
]

interface AttendanceChartProps {
  fullSize?: boolean
}

export function AttendanceChart({ fullSize = false }: AttendanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={fullSize ? 400 : 300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <defs>
          <linearGradient id="colorTaux" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#c83e3e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#c83e3e" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#f5f0e8" }} />
        <YAxis
          domain={[80, 100]}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "#f5f0e8" }}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, "Taux de présence"]}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #f5f0e8",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Area type="monotone" dataKey="taux" stroke="#c83e3e" fillOpacity={1} fill="url(#colorTaux)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

