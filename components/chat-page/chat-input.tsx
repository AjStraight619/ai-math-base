"use client";
import React, { useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { Paperclip, Send } from "lucide-react";
import { motion } from "framer-motion";
import { sidebarPresenceVariants } from "@/lib/data";
import { useSidebarContext } from "@/context/sidebar-presence-context";
import { Button } from "../ui/button";

type ChatInputProps = {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  input: string
  isLoading: boolean
};

const ChatInput = ({handleChange, input, handleSubmit, isLoading}: ChatInputProps) => {
  const formRef = useRef<HTMLFormElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const minHeight = 40;
  const maxHeight = 200;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      let newHeight = minHeight;

      if (scrollHeight > minHeight) {
        newHeight = Math.min(scrollHeight, maxHeight);
      }
      textarea.style.height = `${newHeight}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isLoading) return
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.dispatchEvent(new Event("submit", {
        bubbles: true,
        cancelable: true
      }));
    }
  }


  const { isSidebarOpen } = useSidebarContext();
  const inputRef = useRef<HTMLInputElement>(null);


  return (
    <form ref={formRef} onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 lg:left-0 mx-auto z-50">
      <motion.div
        variants={sidebarPresenceVariants}
        animate={isSidebarOpen ? "sidebarOpen" : "sidebarClosed"}
        initial="sidebarClosed"
        className="shadow-md mx-auto p-2 mb-2 w-full lg:w-[calc(100% - 12rem)] w-full md:max-w-2xl relative"
      >
        <Textarea style={{
            lineHeight: "1",
            minHeight: `${minHeight}px`,
            maxHeight: `${maxHeight}px`,
            height: `${minHeight}px`,
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
           value={input} onChange={handleChange} className="w-full resize-none rounded-2xl pt-4 pl-9 pr-10 overflow-y-auto" />
        <input hidden ref={inputRef} type='file' />
        <button disabled={isLoading} className="absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer">
        <Paperclip onClick={() => inputRef?.current?.click()}  />
        </button>
        <button disabled={isLoading} type='submit' className='absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer'>
        <Send  />
        </button>
      </motion.div>
    </form>
  );
};

export default ChatInput;
