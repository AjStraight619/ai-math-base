import { getDashboardData } from '@/actions/dashboard'
import { auth } from '@/auth'
import ActivityFetcher from '@/components/dashboard-page/activity-fetcher'
import ChatActivity from '@/components/dashboard-page/chat-activity'
import DashboardSkeleton from '@/components/dashboard-page/dashboard-skeleton'
import NoteActivity from '@/components/dashboard-page/note-activity'
import SectionDivider from '@/components/dashboard-page/section-divider'
import UserButton from '@/components/user/user-button'
import { wait } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export default async function DashboardPage() {
  const session = await auth()
  if (!session || !session.user?.id) {
    redirect('/login')
  }

  return (
    <main className="w-full flex flex-col items-center">
      <div className="fixed top-4 right-4">
        <UserButton />
      </div>
      <h1 className="text-4xl font-poppins text-secondary pt-12 md:pt-6">
        Dashboard
      </h1>
      <h2 className="font-poppins text-xl pt-8">
        Welcome back {session?.user?.name?.split(' ').slice(0, -1)}!
      </h2>
      <div className="container">
        <SectionDivider>Recent Activity</SectionDivider>
        <Suspense fallback={<DashboardSkeleton />}>
          <ActivityFetcher session={session} />
        </Suspense>
      </div>
    </main>
  )
}
