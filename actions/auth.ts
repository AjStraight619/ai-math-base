"use server";
import { LoginFormType, RegisterFormType } from "@/lib/types";
import { wait } from "@/lib/utils";
import { LoginSchema, RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const register = async (values: RegisterFormType) => {
  const validatedValues = RegisterSchema.safeParse(values);
  if (!validatedValues.success) {
    return {
      error: "Invalid input values!",
    };
  }

  const { email, password, name } = validatedValues.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  await wait(1000);

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    success: "User created!",
  };
};

export const login = async (values: LoginFormType) => {
  const validatedValues = LoginSchema.safeParse(values);
  if (!validatedValues.success) {
    return {
      error: "Invalid input values!",
    };
  }
  const { email, password } = validatedValues.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    console.log("in try block in login function, no error");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }

  return {
    success: "User created!",
  };
};
