"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";

export const AiAvatar = () => (
  <Avatar>
    <AvatarImage />
    <AvatarFallback>
      <span>AI</span>
    </AvatarFallback>
  </Avatar>
);

export const UserAvatar = () => {
  const { data: session } = useSession();

  return (
    <Avatar>
      <AvatarImage src={session?.user?.image ?? ""} />
      <AvatarFallback>
        <span>{session?.user?.name?.split("").map((n) => n[0])}</span>
      </AvatarFallback>
    </Avatar>
  );
};
