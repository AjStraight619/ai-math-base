import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Chat, Message } from "@prisma/client";

type ChatWithMessages = Chat & {
  messages: Message[];
};

type ChatActivityProps = {
  chats: ChatWithMessages[];
};

const ChatActivity = ({ chats }: ChatActivityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Chats</CardTitle>
        <CardDescription>Recent chat activity</CardDescription>
      </CardHeader>
      <CardContent>
        {chats.length === 0 ? (
          <p className="text-center text-secondary">No recent chat activity</p>
        ) : (
          <div></div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChatActivity;
