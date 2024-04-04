import { ChatMetaData } from '@/lib/types'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useOptimistic } from 'react'
import Options from './options'
import NewChatForm from '@/components/chat-page/new-chat-form'

type SidebarChatProps = {
  chatData: ChatMetaData
}

type ChatDataState = {
  id: string
  name: string
  isPending?: boolean
}

type AddChat = {
  type: 'ADD'
  payload: ChatDataState
}

type RemoveChat = {
  type: 'REMOVE'
  payload: string
}

export type ChatAction = AddChat | RemoveChat

function reducer(state: ChatDataState[], action: ChatAction): ChatDataState[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload]
    case 'REMOVE':
      return state.filter((chat) => chat.id !== action.payload)
    default:
      return state
  }
}

const SidebarChat = ({ chatData }: SidebarChatProps) => {
  const pathname = usePathname()
  const chatId = pathname.split('/').pop()

  const [optimisticChats, dispatch] = useOptimistic(chatData, reducer)

  return (
    <div className="flex flex-col space-y-6">
      <NewChatForm dispatch={dispatch} />

      <ul className="space-y-1">
        {optimisticChats.map((chat) => (
          <li
            className={`flex flex-row items-center cursor-pointer justify-between hover:bg-muted-foreground/20  p-1 rounded-md ${
              chatId === chat.id ? 'bg-muted-foreground/30' : ''
            }`}
            key={chat.id}
          >
            <Link
              className={`${
                chatId === chat.id ? 'text-primary' : 'text-primary/45'
              } w-full`}
              href={`/chat/${chat.id}`}
            >
              {chat.name}
            </Link>
            {chatId === chat.id && <Options dispatch={dispatch} />}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarChat
