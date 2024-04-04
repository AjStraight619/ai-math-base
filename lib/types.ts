import {
  LoginSchema,
  NewChatSchema,
  RegisterSchema,
  ServerNewChatSchema,
  UpdateUserSchema,
} from '@/schemas'
import { z } from 'zod'
import { navLinks } from './data'
import { getChatById, getChatMetaDataByUserId } from '@/actions/chat'
import { Chat, Prisma, Role, Subject } from '@prisma/client'
import { getUserData } from '@/actions/user'
import { Message } from 'ai/react'

export type RegisterFormType = z.infer<typeof RegisterSchema>

export type LoginFormType = z.infer<typeof LoginSchema>

export type SectionName = (typeof navLinks)[number]['name']

export type ChatMetaData = Prisma.PromiseReturnType<
  typeof getChatMetaDataByUserId
>

export type ChatById = Prisma.PromiseReturnType<typeof getChatById>

export type UserData = Prisma.PromiseReturnType<typeof getUserData>

export type UserFormType = z.infer<typeof UpdateUserSchema>

export type ExtendedMessage = Message & {
  chatId: string
}

export type MessagesToUpsert = {
  content: string
  role: Role
}

export type ChatWithMessages = Chat & {
  messages: Message[]
  subjects: Subject[]
}

export type NewChatFormType = z.infer<typeof NewChatSchema>

export type NewChatServer = z.infer<typeof ServerNewChatSchema>
