import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/auth'

const CallToAction = async () => {
  const session = await auth()

  console.log(JSON.stringify(session, null, 2))

  return (
    <div className="flex md:flex-row flex-col items-center justify-center gap-2 my-8">
      {session?.user ? (
        <Link href="/dashboard">
          <div className="bg-gradient-to-tr from-cyan-500 to-purple-700 p-[1px] rounded-md ">
            <Button
              size="lg"
              className="group transition-all duration-300 dark:bg-gray-100 rounded-md inline-flex items-center justify-center dark:text-black text-gray-50 py-2"
            >
              Dashboard
              <ArrowRight className="ml-2 group-hover:translate-x-1 duration-300" />
            </Button>
          </div>
        </Link>
      ) : (
        <div className="bg-gradient-to-tr from-cyan-500 to-purple-700 p-[1px] rounded-md">
          <Link href="/register">
            <Button
              size="lg"
              className="group transition-all duration-300 dark:bg-gray-100 rounded-md inline-flex items-center justify-center dark:text-black text-gray-50 py-2"
            >
              Get started
              <ArrowRight className="ml-2 group-hover:translate-x-1 duration-300" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CallToAction
