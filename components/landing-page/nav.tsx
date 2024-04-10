import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { navLinks } from '@/lib/data'
import Link from 'next/link'
import { ModeToggle } from '../ui/mode-toggle'
import MobileMenu from './mobile-menu'
import { auth } from '@/auth'
import UserButton from '../user/user-button'
const Nav = async () => {
  const session = await auth()
  return (
    <>
      <MobileMenu />
      <header className="fixed top-0 w-full h-16 border-b border-muted-foreground backdrop-blur-3xl z-[999] hidden sm:block">
        <div className="container h-full">
          <nav className="flex items-center justify-between h-full">
            <div className="flex items-center gap-2">
              <Image
                src="/mathbase.svg"
                alt="Math Base"
                width={100}
                height={100}
                className="dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              />
              <ul className="flex items-center gap-2 ml-4">
                {navLinks.map((link) => (
                  <li
                    className="cursor-pointer text-muted-foreground hover:text-primary transition-colors duration-150"
                    key={link.name}
                  >
                    <Link href={link.hash}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              {session && (
                <div className="inline-flex items-center">
                  <span className="ml-2">
                    <UserButton />
                  </span>
                </div>
              )}
              <ModeToggle />
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Nav
