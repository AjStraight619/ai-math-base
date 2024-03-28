"use server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "./user";

export const getChatsByUserId = async () => {
  const userId = await getUserId();
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userId,
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
