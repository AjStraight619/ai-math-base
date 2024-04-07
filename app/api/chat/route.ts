import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { MessagesToUpsert } from '@/lib/types'

export const runtime = 'edge'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://ai-math-base.vercel.app'
    : 'http://localhost:3000'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  const { messages, chatId } = await req.json()
  // TODO: Add file upload support

  const lastMessage = messages.slice(-1)[0]
  let messagesToUpsert: MessagesToUpsert[] = []

  const response = await openai.chat.completions.create({
    model: 'gpt-4-0125-preview',
    stream: true,
    messages: messages,
  })

  const stream = OpenAIStream(response, {
    onCompletion: async (completion) => {
      messagesToUpsert = [
        {
          ...lastMessage,
        },
        {
          role: 'assistant',
          content: completion,
        },
      ]

      console.log(JSON.stringify(messagesToUpsert, null, 2))

      await fetch(`${baseUrl}/api/user/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatId,
          conversationUpdate: messagesToUpsert,
        }),
      })
    },
  })

  return new StreamingTextResponse(stream)
}
