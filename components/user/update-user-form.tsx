"use client";

import { UserData, UserFormType } from "@/lib/types";
import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema } from "@/schemas";
import ProfileImage from "./profile-image";

type UpdateUserFormProps = {
  userData: UserData;
};

const UpdateUserForm = ({ userData }: UpdateUserFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<UserFormType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: userData?.name ?? "",
      email: userData?.email ?? "",
    },
  });

  const onSubmit = (values: UserFormType) => {
    startTransition(() => {});
  };
  return (
    <Card>
      <CardHeader>
        <ProfileImage />
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          ></form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateUserForm;
