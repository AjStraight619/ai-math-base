'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from '@/components/user/user-avatar'
import { ChatMetaData } from '@/lib/types'
import { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Separator } from '@/components/ui/separator'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
} from 'lucide-react'
import { useSidebarContext } from '@/context/sidebar-presence-context'
import SidebarDashboard from '@/components/navigation/sidebar/sidebar-dashboard'
import SidebarChat from './sidebar-chat'
import UserButton from '@/components/user/user-button'

type SidebarProps = {
  chatMetaData: ChatMetaData
  session: Session | null
}

const dropdownLinks = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: React.createElement(LayoutDashboardIcon),
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: React.createElement(SettingsIcon),
  },
  {
    label: 'Sign Out',
    href: '/api/auth/signout',
    icon: React.createElement(LogOutIcon),
    separator: true,
  },
]

const sidebarVariants = {
  hidden: { x: '-100%' },
  show: { x: 0 },
}

const buttonVariants = {
  hidden: { left: 0 },
  show: { left: '12rem' },
}

const Sidebar = ({ chatMetaData, session }: SidebarProps) => {
  const pathname = usePathname()
  const mostRecentChatId = chatMetaData[0]?.id ?? ''

  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext()
  const [isHovering, setIsHovering] = useState(false)
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  // * If the user is on the home page, don't render the sidebar
  if (
    pathname === '/' ||
    pathname === '/register' ||
    pathname === '/login' ||
    pathname.includes('/settings') ||
    pathname.includes('/forgot-password') ||
    pathname.includes('/dashboard')
  )
    return null

  const isDashboardPath = pathname === '/dashboard'
  const isChatPath = pathname.includes('/chat')

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ type: 'tween' }}
            className="fixed top-0 h-full w-48 border-r border-muted-foreground bg-zinc-900 p-2 z-[999]"
          >
            <div className="flex flex-col items-center h-full">
              <div className="flex-1 w-full">
                {isDashboardPath && (
                  <SidebarDashboard mostRecentChatId={mostRecentChatId} />
                )}

                {isChatPath && <SidebarChat chatData={chatMetaData} />}
              </div>

              <UserButton />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <motion.button
        onClick={handleSidebarToggle}
        className="fixed -translate-y-1/2 top-1/2 cursor-pointer z-[999] hidden md:block"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        animate={isSidebarOpen ? 'show' : 'hidden'}
        variants={buttonVariants}
      >
        {isHovering ? (
          isSidebarOpen ? (
            <ChevronLeftIcon className="ml-2" />
          ) : (
            <ChevronRightIcon className="ml-2" />
          )
        ) : (
          <div className="w-[2px] h-6 rounded-md bg-gray-50 ml-4" />
        )}
      </motion.button>
    </>
  )
}

export default Sidebar
