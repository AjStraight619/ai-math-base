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
import Link from 'next/link'
import { ArrowRightIcon, BotIcon, ExternalLinkIcon } from 'lucide-react'

type ChatActivityProps = {
  chats: ChatWithMessages[]
}

const ChatActivity = ({ chats }: ChatActivityProps) => {
  const subjects = chats.map((chat) => chat.subjects).flat()
  return (
    <Card className="relative">
      <div className="absolute top-6 right-6">
        <Link
          className="inline-flex gap-2 items-center opacity-50 hover:opacity-100 transition-all duration-150 group"
          href={`/chat/${chats[0].id}`}
        >
          <span>Chats</span>
          <span>
            <ArrowRightIcon className="group-hover:translate-x-2 duration-150" />
          </span>
        </Link>
      </div>
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
