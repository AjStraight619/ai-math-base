"use client";


import {  useChat } from "ai/react";
import { ChatById, ExtendedMessage } from "@/lib/types";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";
import { usePathname } from "next/navigation";



export type ChatProps = {
  chat: ChatById;
};

const Chat = ({ chat }: ChatProps) => {
  const { messages: dbMessages } = chat ?? {};
  const pathname = usePathname()


  const {messages, setMessages, handleInputChange, handleSubmit, input, setInput, isLoading} = useChat({
    body: {
      chatId: pathname.split('/').pop() as string,
    }
  });

  const combinedMessages: ExtendedMessage[] = [...(dbMessages ?? []), ...messages].map(message => ({
    ...message,
    chatId:  chat?.id as string,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e)
  }


  return (
    <div className='overflow-x-hidden'>
        <ChatMessages chat={chat} combinedMessages={combinedMessages} />
      <ChatInput input={input} handleChange={handleChange} handleSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default Chat;
