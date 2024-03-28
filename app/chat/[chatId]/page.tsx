import { getChatById } from "@/actions/chat";
import Chat from "@/components/chat-page/chat";

type ChatPageProps = {
  params: {
    chatId: string;
  };
};

export default async function ChatPage({ params: { chatId } }: ChatPageProps) {
  const chat = await getChatById(chatId);

  return <Chat chat={chat} />;
}
