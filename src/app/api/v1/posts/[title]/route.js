import { postController } from "@/controllers/posts/postsController"
import { NextResponse } from "next/server"

export async function GET (req, { params }) {
  const { title } = params
  console.log(title)
  const titleReplaced = title.replace(/-/g, " ")
  console.log(titleReplaced)
  try {
    const post = await postController.getByTitle(titleReplaced)
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(error.message, {status: 400} )
  }

}