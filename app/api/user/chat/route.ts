import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getErrorMessage } from "@/lib/utils";

/**
 * Handles the POST request to add new messages to a specific chat session.
 * The function expects a JSON payload containing the chat ID and the new messages to be added.
 * The messages are sorted to prioritize user messages and then saved to the database.
 *
 * @param {NextRequest} req - The incoming request object from Next.js.
 * @returns {NextResponse} - A JSON response confirming the addition of the messages.
 */

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { chatId, conversationUpdate } = data;

  conversationUpdate.sort((a: any) => (a.role === "user" ? -1 : 1));

  try {
    for (const message of conversationUpdate) {
      const { role, content } = message;

      await prisma.message.create({
        data: {
          chatId: chatId,
          role: role,
          content: content,
        },
      });
    }

    return NextResponse.json({ success: true, err: "" });
  } catch (err) {
    const error = getErrorMessage(err);
    return NextResponse.json({ success: false, error: error });
  }
}
