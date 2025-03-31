"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "0-5", value: 5, color: "#ef4444" },
  { name: "6-8", value: 10, color: "#f97316" },
  { name: "9-10", value: 15, color: "#eab308" },
  { name: "11-13", value: 25, color: "#84cc16" },
  { name: "14-16", value: 30, color: "#22c55e" },
  { name: "17-20", value: 15, color: "#14b8a6" },
]

export function GradesDistribution() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value} élèves`, `Notes: ${name}`]}
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #f5f0e8",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

