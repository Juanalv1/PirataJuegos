import { sign } from "jsonwebtoken";
import prisma from "@/libs/db/prisma";
import { userController } from "@/controllers/users/userController";

export class loginModel {
  static async login(user, password) {
    try {
      if (user.password !== password) {
        throw new Error("Invalid Password")
      }

      const { username } = user
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          username: username,
        }, 'secret')
      return token
    } catch (error) {
      throw new Error(error.message)
    }
  }
}