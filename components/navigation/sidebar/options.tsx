import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Ellipsis, PencilIcon, TrashIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { liVariants, ulVariants } from '@/lib/data'
import { ChatAction } from './sidebar-chat'
import { deleteChat } from '@/actions/chat'

type OptionsProps = {
  dispatch: (action: ChatAction) => void
}

type ChatOption = {
  label: string
  icon: JSX.Element
  action: (id: string) => void | Promise<void>
}

const Options = ({ dispatch }: OptionsProps) => {
  const pathname = usePathname()
  const chatId = pathname.split('/').pop()

  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const chatOptions: ChatOption[] = [
    {
      label: 'Delete Chat',
      icon: React.createElement(TrashIcon),
      action: async (id: string) => {
        if (typeof chatId === 'string') {
          dispatch({ type: 'REMOVE', payload: chatId })
          await deleteChat(id)
        } else {
        }
      },
    },
    {
      label: 'Edit Chat',
      icon: React.createElement(PencilIcon),
      action: (id: string) => {},
    },
  ]

  const handleClick = (option: string) => {
    if (option === 'Delete Chat') {
      setIsDeleting(true)
    } else {
      setIsEditing(true)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <Ellipsis />
        </button>
      </PopoverTrigger>
      <PopoverContent className="z-[999] space-y-2">
        <motion.ul
          className="flex items-center justify-start flex-col gap-y-2"
          initial="hidden"
          animate="show"
          variants={ulVariants}
        >
          {chatOptions.map((option, index) => (
            <motion.li className="list-none" variants={liVariants} key={index}>
              <button
                onClick={() => option.action(chatId as string)}
                className="w-full flex flex-row gap-x-2"
              >
                <span>{option.icon}</span>
                <span>{option.label}</span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </PopoverContent>
    </Popover>
  )
}

export default Options

const DeletAlert = () => {}
