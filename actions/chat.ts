'use server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { getErrorMessage } from '@/lib/utils'
import { NewChatServer } from '@/lib/types'
import { revalidatePath } from 'next/cache'
import { ServerNewChatSchema } from '@/schemas'

export const getChatsByUserId = async () => {
  const session = await auth()

  if (!session || !session.user) {
    return {
      error: 'Not authenticated',
    }
  }
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId: session.user.id,
      },
    })

    return {
      chats,
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
      chats: null,
    }
  }
}

export const getChatMetaDataByUserId = async (userId: string | undefined) => {
  try {
    const chatMetaData = await prisma.chat.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
    return chatMetaData
  } catch (err) {
    return []
  } finally {
    revalidatePath('/chat')
  }
}

export const getChatById = async (chatId: string) => {
  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })
  return chat
}

// export const saveMessagesToDb = async (
//   chatId: string,
//   messages: MessagesToUpsert[]
// ) => {
//   try {
//     console.log("In saveMessagesToDb function");
//     for (const message of messages) {
//       await prisma.message.create({
//         data: {
//           chatId: chatId,
//           role: message.role,
//           content: message.message,
//         },
//       });
//     }
//   } catch (err) {
//     const error = getErrorMessage(err);
//     return {
//       error,
//     };
//   }
// };

export const deleteChat = async (formData: FormData) => {
  const chatId = formData.get('chatId') as string
  try {
    const deletedChat = await prisma.$transaction([
      prisma.message.deleteMany({
        where: {
          chatId,
        },
      }),
      prisma.chat.delete({
        where: {
          id: chatId,
        },
      }),
    ])

    return {
      deletedChat,
      error: null,
    }
  } catch (err) {
    return {
      error: getErrorMessage(err),
      deletedChat: null,
    }
  } finally {
    revalidatePath('/chat')
  }
}

export const createNewChat = async (values: NewChatServer) => {
  console.log('In create new chat function')
  const validatedValues = ServerNewChatSchema.safeParse(values)
  const session = await auth()
  if (!session || !session?.user?.id) {
    return {
      error: 'No valid session!',
    }
  }

  if (!validatedValues.success) {
    return {
      error: 'Invalid input values!',
    }
  }
  try {
    const newChat = await prisma.chat.create({
      data: {
        userId: session.user.id,
        name: values.name,
        tags: {
          create: values?.tags?.map((tag) => ({
            name: tag.name,
          })),
        },
      },
      select: {
        id: true,
        name: true,
      },
    })
    return {
      newChat,
      error: null,
    }
  } catch (err) {
    return {
      newChat: null,
      error: getErrorMessage(err),
    }
  } finally {
    revalidatePath('/chat')
  }
}

export const userMessage = async (message: string) => {}
