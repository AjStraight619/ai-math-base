'use client'
import { Subject } from '@prisma/client'

import React from 'react'

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  PieLabel,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

type ChatActivityChartProps = {
  subjects: Subject[]
}
const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#A28FEF',
  '#EF8FEF',
  '#8FEFAF',
]

const ChatActivityChart = ({ subjects }: ChatActivityChartProps) => {
  const data = subjects.reduce((acc, subject) => {
    const existingSubject = acc.find((s) => s.name === subject.name)
    if (existingSubject) {
      existingSubject.value += 1
    } else {
      acc.push({ name: subject.name, value: 1 })
    }
    return acc
  }, [] as { name: string; value: number }[])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius="80%"
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default ChatActivityChart
