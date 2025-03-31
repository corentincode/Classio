"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Mathématiques", moyenne: 15.2 },
  { name: "Français", moyenne: 13.8 },
  { name: "Histoire", moyenne: 14.5 },
  { name: "Sciences", moyenne: 16.1 },
  { name: "Anglais", moyenne: 14.2 },
  { name: "Arts", moyenne: 17.3 },
  { name: "Sport", moyenne: 15.9 },
]

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "#f5f0e8" }} />
        <YAxis
          domain={[0, 20]}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "#f5f0e8" }}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          formatter={(value) => [`${value}/20`, "Moyenne"]}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #f5f0e8",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Bar dataKey="moyenne" fill="#c83e3e" radius={[4, 4, 0, 0]} barSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}

