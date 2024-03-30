import { ChatMetaData } from "@/lib/types";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Options from "./options";

type SidebarChatProps = {
  chatData: ChatMetaData;
};

const SidebarChat = ({ chatData }: SidebarChatProps) => {
  const pathname = usePathname();
  const chatId = pathname.split("/").pop();

  return (
    <div className="w-full flex flex-col">
      <ul className="space-y-1">
        {chatData.map((chat) => (
          <li
            className={`flex flex-row items-center cursor-pointer justify-between hover:bg-secondary  p-1 rounded-md ${
              chatId === chat.id ? "bg-secondary" : ""
            }`}
            key={chat.id}
          >
            <Link
              className={`${
                chatId === chat.id ? "text-primary" : "text-primary/45"
              }`}
              href={`/chat/${chat.id}`}
            >
              {chat.name}
            </Link>
            {chatId === chat.id && <Options />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarChat;
