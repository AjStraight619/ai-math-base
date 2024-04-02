import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Note } from '@prisma/client'
import ChatActivityChart from './chat-activity-chart'

type NoteActivityProps = {
  notes: any[]
}

const NoteActivity = ({ notes }: NoteActivityProps) => {
  const subjects = notes.map((note) => note.subjects).flat()
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardDescription>Recent note activity</CardDescription>
      </CardHeader>
      <CardContent className="p-2 flex flex-col flex-grow items-center">
        {notes?.length === 0 ? (
          <p className="text-center text-secondary">No recent note activity</p>
        ) : (
          <ChatActivityChart subjects={subjects} />
        )}
      </CardContent>
    </Card>
  )
}

export default NoteActivity
