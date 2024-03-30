"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { getErrorMessage } from "@/lib/utils";
import { MessagesToUpsert } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const getChatsByUserId = async () => {
  const session = await auth();

  if (!session || !session.user) {
    return {
      error: "Not authenticated",
    };
  }
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return chats;
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

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
    });
    return chatMetaData;
  } catch (err) {
    return [];
  }
};

export const getChatById = async (chatId: string) => {
  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  return chat;
};

export const saveMessagesToDb = async (
  chatId: string,
  messages: MessagesToUpsert[]
) => {
  try {
    for (const message of messages) {
      await prisma.message.create({
        data: {
          chatId: chatId,
          role: message.role,
          content: message.message,
        },
      });
    }
  } catch (err) {
    const error = getErrorMessage(err);
    return {
      error,
    };
  }
};

export const deleteChat = async (chatId: string) => {
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
    ]);

    return {
      deletedChat,
      error: null,
    };
  } catch (err) {
    const error = getErrorMessage(err);
    return {
      error,
      deletedChat: null,
    };
  } finally {
    revalidatePath("/chat");
  }
};
