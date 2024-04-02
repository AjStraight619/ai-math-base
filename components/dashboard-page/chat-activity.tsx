import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Chat, Message } from '@prisma/client'
import { ChatWithMessages } from '@/lib/types'
import ChatActivityChart from './chat-activity-chart'

type ChatActivityProps = {
  chats: ChatWithMessages[]
}

const ChatActivity = ({ chats }: ChatActivityProps) => {
  const subjects = chats.map((chat) => chat.subjects).flat()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chats</CardTitle>
        <CardDescription>Recent chat activity</CardDescription>
      </CardHeader>
      <CardContent className="p-2 flex flex-col flex-grow items-center">
        {chats.length === 0 ? (
          <p className="text-center text-secondary">No recent chat activity</p>
        ) : (
          <ChatActivityChart subjects={subjects} />
        )}
      </CardContent>
    </Card>
  )
}

export default ChatActivity
