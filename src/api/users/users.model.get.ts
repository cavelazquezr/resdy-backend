import { Prisma, User } from "@prisma/client";
import { client } from "../../services/prisma";
import { UserStatus } from "../../types/messages";

export const getUsersHandler = async (
  props: Prisma.UserWhereInput
): Promise<User[] | UserStatus> => {
  const users = await client.user.findMany({ where: props });

  if (users.length === 0) {
    return UserStatus.NOT_FOUND;
  }

  return users;
};