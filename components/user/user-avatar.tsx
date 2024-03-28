import { Session } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  session: Session | null;
};

const UserAvatar = ({ session }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarFallback>
        {session?.user?.name?.split(" ").map((n) => n[0])}
      </AvatarFallback>
      <AvatarImage src={session?.user?.image || ""}></AvatarImage>
    </Avatar>
  );
};

export default UserAvatar;
