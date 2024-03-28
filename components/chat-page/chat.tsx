"use client";

import React from "react";
import { useChat } from "ai/react";
import { ChatById } from "@/lib/types";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";

export type ChatProps = {
  chat: ChatById;
};

const Chat = ({ chat }: ChatProps) => {
  const { messages } = chat ?? {};

  const {} = useChat();
  return (
    <>
      <main>
        <ChatMessages chat={chat} />
      </main>
      <ChatInput />
    </>
  );
};

export default Chat;
