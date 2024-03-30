"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { UserFormType } from "@/lib/types";
import { getErrorMessage, wait } from "@/lib/utils";
import { UpdateUserSchema } from "@/schemas";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
  if (!session || !session.user) {
    return {
      error: "Not authenticated",
    };
  }
  return session?.user?.id;
};

export const getUserData = async (userId: string) => {
  const session = await auth();
  if (!session || !session.user) {
    return {
      user: null,
      error: "Not authenticated",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    // const { password, ...userWithoutPassword } = user;
    return {
      user,
      error: null,
    };
  } catch (err) {
    return {
      user: null,
      error: "User not found",
    };
  } finally {
    revalidatePath("/settings");
  }
};

export const checkUserSession = async () => {
  const session = await auth();
  if (!session) return null;

  return session;
};

export const updateUser = async (values: UserFormType) => {
  const session = await auth();
  if (!session || !session.user) {
    return {
      error: "Not authenticated",
      user: null,
    };
  }

  const validatedValues = UpdateUserSchema.safeParse(values);

  if (!validatedValues.success) {
    return {
      error: "Invalid input values!",
      user: null,
    };
  }

  const { name, email, image } = validatedValues.data;

  try {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        email,
        image: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${session.user.id}`,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
    return {
      user,
      error: null,
    };
  } catch (err) {
    const error = getErrorMessage(err);
    return {
      error: error,
      user: null,
    };
  } finally {
    revalidatePath("/settings");
  }
};
