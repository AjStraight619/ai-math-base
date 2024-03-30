import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { MessagesToUpsert } from "@/lib/types";
import { saveMessagesToDb } from "@/actions/chat";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { messages, chatId } = await req.json();
  // TODO: Add file upload support

  const lastMessage = messages.slice(-1)[0];
  let messagesToUpsert: MessagesToUpsert[] = [];

  const response = await openai.chat.completions.create({
    model: "gpt-4-0125-preview",
    stream: true,
    messages: messages,
  });

  const stream = OpenAIStream(response, {
    onCompletion: async (completion) => {
      messagesToUpsert = [
        {
          ...lastMessage,
        },
        {
          role: "assistant",
          message: completion,
        },
      ];

      await saveMessagesToDb(chatId, messagesToUpsert);
    },
  });

  return new StreamingTextResponse(stream);
}
