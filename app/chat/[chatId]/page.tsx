import { getChatById } from "@/actions/chat";
import Chat from "@/components/chat-page/chat";

type ChatPageProps = {
  params: {
    chatId: string;
  };
};

export const dynamic = "force-dynamic";

export default async function ChatPage({ params: { chatId } }: ChatPageProps) {
  const chat = await getChatById(chatId);

  console.log("fetched new chat");

  return <Chat chat={chat} />;
}
