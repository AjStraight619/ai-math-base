'use server'
import { prisma } from '@/lib/prisma'

export const getDashboardData = async (userId: string) => {
  const [user, chats, notes] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId,
      },
    }),
    prisma.chat.findMany({
      where: {
        userId: userId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
        subjects: true,
      },
    }),
    prisma.folder.findMany({
      where: {
        userId: userId,
      },
      include: {
        notes: true,
      },
    }),
  ])

  return {
    user,
    chats,
    notes,
  }
}
