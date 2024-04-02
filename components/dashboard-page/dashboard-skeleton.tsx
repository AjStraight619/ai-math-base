import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="space-y-2">
            <CardTitle>
              <Skeleton className="w-24 h-6" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-32 h-3" />
            </CardDescription>
            <CardContent className="p-2 flex flex-col flex-grow items-center">
              <Skeleton className="md:w-52 md:h-52 rounded-full h-24 w-24 my-8" />
            </CardContent>
          </CardHeader>
          <CardFooter>
            <Skeleton className="w-full h-4" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default DashboardSkeleton
