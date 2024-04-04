"use client";

import React, { useEffect, useState, useTransition } from "react";
import { v4 as uuid } from "uuid";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewChatSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { NewChatFormType } from "@/lib/types";
import { Input } from "../ui/input";
import { PlusIcon, X, XIcon } from "lucide-react";
import SubmitButton from "../ui/submit-button";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { createNewChat } from "@/actions/chat";
import { ErrorMessage } from "../ui/form-messages";
import { ChatAction } from "../navigation/sidebar/sidebar-chat";
import { getErrorMessage } from "@/lib/utils";

type NewChatFormProps = {
  isOnSidebar?: boolean;
  dispatch: (action: ChatAction) => void;
};

type Tag = {
  id: string;
  name: string;
};

const NewChatForm = ({ isOnSidebar, dispatch }: NewChatFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [currentTag, setCurrentTag] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagError, setTagError] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(NewChatSchema),
    defaultValues: {
      name: "New Chat",
      subject: "",
      tags: "",
    },
  });

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setCurrentTag(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setTagError("");

    if (e.key === "Enter") {
      if (tags.some((tag) => tag.name === currentTag)) {
        setTagError("Tag already exists");
        return;
      }
      if (currentTag.length <= 1) {
        setTagError("Tag too short");
        return;
      }
      setTags((prevTags) => [...prevTags, { id: uuid(), name: currentTag }]);
      setCurrentTag("");
      e.preventDefault();
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const onSubmit = (values: Omit<NewChatFormType, "tags">) => {
    setSubmitError("");
    const newChatData = {
      ...values,
      tags: tags,
    };

    startTransition(() => {
      createNewChat(newChatData).then(
        (data) => {
          form.reset();
        },
        (err: unknown) => {
          const error = getErrorMessage(err);
          setSubmitError(error);
        }
      );
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full justify-evenly">
          <span>New Chat</span>
          <span>
            <PlusIcon />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Chat</DialogTitle>
          <DialogDescription>
            The subject field is for the AI to understand the scope of what the
            conversation is supposed to be. This will also help the AI give
            suggestions and utilize its external tools in a better way.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject{" "}
                      <span className="ml-1 text-muted-foreground text-sm">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Algebra, Calculus, etc."
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          handleTagChange(e);
                          field.onChange(e);
                        }}
                        onKeyDown={handleKeyDown}
                        value={currentTag}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ErrorMessage errorMessage={tagError} />
              {submitError && <ErrorMessage errorMessage={submitError} />}

              <ul className="flex flex-row flex-wrap items-center justify-start gap-x-2 gap-y-2">
                {tags.map((tag, index) => (
                  <li key={tag.id}>
                    <Badge className="p-2 rounded-md" variant="outline">
                      <span>{tag.name}</span>
                      <button
                        onClick={() => handleRemoveTag(tag.id)}
                        type="button"
                      >
                        <XIcon size={20} />
                      </button>
                    </Badge>
                  </li>
                ))}
              </ul>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <SubmitButton isPending={isPending}>Create Chat</SubmitButton>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatForm;
