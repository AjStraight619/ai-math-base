'use client'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from './user-avatar'
import { Separator } from '../ui/separator'
import { LayoutDashboardIcon, LogOutIcon, SettingsIcon } from 'lucide-react'
import { auth } from '@/auth'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

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

const UserButton = () => {
  const { data: session } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full flex justify-evenly gap-x-2 p-2 items-center  hover:bg-gray-700/40 rounded-lg cursor-pointer z-50">
          <UserAvatar session={session} />
          <span>{session?.user?.name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 z-[999]">
        <ul className="space-y-4 w-full">
          {dropdownLinks.map((link, index) => {
            if (link.href === '/settings') {
              link.href = `/settings/${session?.user?.id}`
            }
            return (
              <li className="w-full" key={index}>
                {link.separator && <Separator className="w-full mb-2" />}
                <Link
                  className="flex flex-row items-center gap-x-2 hover:bg-gray-700/40 rounded-lg p-2 w-full transition-colors duration-150"
                  href={link.href}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton
