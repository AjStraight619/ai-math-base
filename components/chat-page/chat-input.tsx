"use client";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import { sidebarPresenceVariants } from "@/lib/data";
import { useSidebarContext } from "@/context/sidebar-presence-context";

const ChatInput = () => {
  const { isSidebarOpen } = useSidebarContext();
  return (
    <form className="fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-3xl w-full px-4">
      <motion.div
        variants={sidebarPresenceVariants}
        animate={isSidebarOpen ? "sidebarOpen" : "sidebarClosed"}
        initial="sidebarClosed"
        className="relative"
      >
        <Textarea className="w-full resize-none h-12 text-base rounded-xl pl-10" />
        <Paperclip className="absolute top-1/2 -translate-y-1/2 left-2" />
      </motion.div>
    </form>
  );
};

export default ChatInput;
