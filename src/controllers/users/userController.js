import { userModel } from "@/models/users/userModel";

export class userController {
  static async getUser(username) {
    if (!username) throw new Error("no username provided")
    try {
      const user = await userModel.getUserByUsername(username)
      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }
}