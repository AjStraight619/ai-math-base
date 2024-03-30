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
import { Button } from "@/components/ui/button";

const chatOptions = [
  {
    label: "Delete Chat",
    icon: React.createElement(TrashIcon),
  },
  {
    label: "Edit Chat",
    icon: React.createElement(PencilIcon),
  },
];

const Options = () => {
  const pathname = usePathname();
  const chatId = pathname.split("/").pop();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = (option: string) => {
    if (option === "Delete Chat") {
      setIsDeleting(true);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <Ellipsis />
        </button>
      </PopoverTrigger>
      <PopoverContent className="z-[999] space-y-2">
        {/* <motion.ul
          className="flex items-center justify-start flex-col gap-y-2"
          initial="hidden"
          animate="show"
          variants={ulVariants}
        > */}
        {chatOptions.map((option, index) => (
          <motion.div className="list-none" variants={liVariants} key={index}>
            <button
              onClick={() => handleClick(option.label)}
              className="w-full flex flex-row gap-x-2"
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          </motion.div>
        ))}
        {/* </motion.ul> */}
      </PopoverContent>
    </Popover>
  );
};

export default Options;

const DeletAlert = () => {};
