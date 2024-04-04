import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis, PencilIcon, TrashIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { liVariants, ulVariants } from "@/lib/data";
import { ChatAction } from "./sidebar-chat";
import { deleteChat } from "@/actions/chat";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import SubmitButton from "@/components/ui/submit-button";
import { useToast } from "@/components/ui/use-toast";

type OptionsProps = {
  dispatch: (action: ChatAction) => void;
};

const Options = ({ dispatch }: OptionsProps) => {
  const pathname = usePathname();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Ellipsis />
        </PopoverTrigger>
        <PopoverContent className="z-[999] max-w-[10rem]">
          <motion.ul
            className="py-2 h-full"
            initial="hidden"
            animate="show"
            variants={ulVariants}
          >
            <motion.li variants={liVariants}>
              <DeleteAlert dispatch={dispatch} />
            </motion.li>
          </motion.ul>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Options;

type DeleteAlertProps = {
  dispatch: (action: ChatAction) => void;
};

const DeleteAlert = ({ dispatch }: DeleteAlertProps) => {
  const pathname = usePathname();
  const chatId = pathname.split("/").pop() as unknown as string;
  const { toast } = useToast();

  const handleDeleteChat = async (formData: FormData) => {
    formData.append("chatId", chatId);
    dispatch({
      type: "REMOVE",
      payload: chatId,
    });

    const { deletedChat, error } = await deleteChat(formData);

    // First, check if there was an error.
    if (error) {
      toast({
        title: "Error",
        description: error,
        duration: 3000,
      });
      return;
    }

    if (deletedChat) {
      const chatName = deletedChat[1].name || "Chat";
      toast({
        title: "Chat deleted",
        description: `${chatName} has been deleted.`,
        duration: 3000,
      });
    } else {
      toast({
        title: "Deletion Unconfirmed",
        description: "The chat deletion could not be confirmed.",
        duration: 3000,
      });
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="inline-flex items-center gap-x-2">
            <TrashIcon size={20} />
            <span>Delete Chat</span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              chat and remove the chat data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <form action={handleDeleteChat}>
              <SubmitButton variant="destructive" className="w-full">
                Delete
              </SubmitButton>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
