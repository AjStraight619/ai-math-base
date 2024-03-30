"use client";
import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { LoginFormType, RegisterFormType } from "@/lib/types";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import SubmitButton from "../ui/submit-button";
import { login, register } from "@/actions/auth";
import Link from "next/link";
import Socials from "./socials";
import { Separator } from "../ui/separator";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormType) => {
    startTransition(() => {
      login(values).then((data) => {});
    });
  };

  return (
    <Card className="w-full md:max-w-[24rem]">
      <CardHeader className="text-center space-y-4">
        <CardTitle>Math Base</CardTitle>
        <CardDescription>Welcome Back!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="JohnDoe@example.com"
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="*******" type="password" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton isPending={isPending} className="w-full">
              Log In
            </SubmitButton>
          </form>
        </Form>
        <div className="flex flex-row items-center justify-center overflow-hidden gap-2 mt-6">
          <Separator />
          <span className="text-muted-foreground">or</span>
          <Separator />
        </div>
        <Socials />
        <div className="w-full text-center mt-6">
          <Link
            className="text-sm hover:underline hover:opacity-100 opacity-30 transition-opacity duration-100"
            href="/register"
          >
            Don't have an account?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
