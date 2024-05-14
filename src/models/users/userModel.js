import prisma from "@/libs/db/prisma";

export class userModel {
  static async getUserByUsername(username) {
    try {
      const user = await prisma.users.findFirst({
        where: {
          username: username
        }
      })
      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }
}