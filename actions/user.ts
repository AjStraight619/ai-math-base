"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { UserFormType } from "@/lib/types";
import { UpdateUserSchema } from "@/schemas";
import { User } from "@prisma/client";

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  console.log("in getUserByEmail function ");
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log("(In getUserByEmail function), user: ", { user });
    if (!user) return;
    return user;
  } catch (err) {
    // TODO: Implement getErrorMessage util function.
    throw new Error("Something went wrong");
  }
};

export const getUserById = async (
  userId: string
): Promise<User | { error: string }> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return {
        error: "User does not exist",
      };
    }

    return user;
  } catch (err) {
    // TODO: Implement getErrorMessage util function.
    return {
      error: "Something happened :(",
    };
  }
};

export const getUserId = async () => {
  const session = await auth();

  console.log("In getUserId function, session: ", session);
  return session?.user?.id;
};

export const getUserData = async (userId: string) => {
  const session = await checkUserSession();
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) return null;
  return user;
};

export const checkUserSession = async () => {
  const session = await auth();
  if (!session) return null;

  return session;
};

export const updateUser = async (values: UserFormType) => {
  const validatedValues = UpdateUserSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      error: "Invalid input values!",
    };
  }

  const { name, email } = validatedValues.data;
};
