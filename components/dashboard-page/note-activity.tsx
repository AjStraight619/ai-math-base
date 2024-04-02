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
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

type NoteActivityProps = {
  notes: any[]
}

const NoteActivity = ({ notes }: NoteActivityProps) => {
  const subjects = notes.map((note) => note.subjects).flat()
  return (
    <Card className="relative">
      <div className="absolute top-6 right-6">
        <Link
          className="inline-flex gap-2 items-center opacity-50 hover:opacity-100 transition-all duration-150 group"
          href={`/chat/${notes[0]?.id}`}
        >
          <span>Notes</span>
          <span>
            <ArrowRightIcon className="group-hover:translate-x-2 duration-150" />
          </span>
        </Link>
      </div>
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
