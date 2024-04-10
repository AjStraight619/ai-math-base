import { getDashboardData } from '@/actions/dashboard'
import { Session } from 'next-auth'
import React from 'react'
import ChatActivity from './chat-activity'
import NoteActivity from './note-activity'
import { wait } from '@/lib/utils'

type ActivityFetcherProps = {
  session: Session | null
}

const ActivityFetcher = async ({ session }: ActivityFetcherProps) => {
  if (!session || !session?.user?.id) {
    return <div>Redirecting...</div>
  }

  const { user, chats, notes } = await getDashboardData(session.user.id)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ChatActivity chats={chats} />
      <NoteActivity notes={notes} />
    </div>
  )
}

export default ActivityFetcher
