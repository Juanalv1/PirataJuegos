import { NextResponse } from "next/server";
import { loginController } from "@/controllers/login/loginController";
import { userController } from "@/controllers/users/userController";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET (re, res) {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");
  if (!token) {
    return NextResponse.json({message: 'invalid token'}, {status: 403})
  }
  const { username } = jwt.verify(token.value, 'secret')
  return NextResponse.json(username, {status: 200})
}

export async function POST(req, res) {
  const data = await req.json()
  console.log(data)
  const { username } = data
  try {
    const token = await loginController.handleLogin(data)
    const response = NextResponse.json(username);
    response.cookies.set({
      name: "sessionToken",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/",
    });
    return response
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}
