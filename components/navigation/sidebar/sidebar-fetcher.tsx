import { auth } from "@/auth";
import React from "react";
import Sidebar from "./sidebar";
import { getChatMetaDataByUserId } from "@/actions/chat";

const SidebarFetcher = async () => {
  const session = await auth();

  const chatMetaData = await getChatMetaDataByUserId(session?.user?.id);

  console.log("Chat Meta Data", chatMetaData);

  return <Sidebar chatMetaData={chatMetaData} session={session} />;
};

export default SidebarFetcher;
