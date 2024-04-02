import DashboardSkeleton from '@/components/dashboard-page/dashboard-skeleton'
import { Suspense } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="font-poppins overflow-y-auto">{children}</div>
}
