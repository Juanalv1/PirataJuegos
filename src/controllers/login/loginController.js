import { loginModel } from "@/models/login/loginModel";
import { userController } from "../users/userController";

export class loginController {

  static async handleLogin(data){
    if (data && (data.username && data.password)) {
      try {
        const user = await userController.getUser(data.username)
        const token = await loginModel.login(user, data.password)
        return token
      } catch (error) {
        throw new Error(error.message)
      }
    } else throw new Error("Invalid request")
  }
}