
import { languagesController } from "@/controllers/languages/languagesController";
import { NextResponse } from "next/server";

export async function GET(req, res){
  try {
    const posts = await languagesController.getLanguagesFromPostId(req)
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}