"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { sidebarPresenceVariants } from "@/lib/data";
import { useSidebarContext } from "@/context/sidebar-presence-context";

import { ChatById, ExtendedMessage } from "@/lib/types";
import { UserAvatar, AiAvatar } from "../avatars/avatars";

type ChatMessageProps = {
  chat: ChatById;
  combinedMessages: ExtendedMessage[];
};

const Chat = ({ chat, combinedMessages }: ChatMessageProps) => {
  const { isSidebarOpen } = useSidebarContext();
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="mb-20">
      <motion.div
        variants={sidebarPresenceVariants}
        animate={isSidebarOpen ? "sidebarOpen" : "sidebarClosed"}
        initial="sidebarClosed"
        className="h-full pt-10"
      >
        <ul className="container max-w-3xl space-y-6">
          {combinedMessages.map((message) => (
            <li className="flex flex-row items-start gap-x-4" key={message.id}>
              <span>
                {message.role === "user" ? <UserAvatar /> : <AiAvatar />}
              </span>
              <span className="font-serif">{message.content}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default Chat;
