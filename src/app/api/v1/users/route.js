import { userController } from "@/controllers/users/userController"
import { NextResponse } from "next/server"

export async function GET(req, res) {
  try {
    const user = await userController.getUser(req)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}