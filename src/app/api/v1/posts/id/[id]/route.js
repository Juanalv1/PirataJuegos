import { postController } from "@/controllers/posts/postsController"
import { NextResponse } from "next/server"

export async function GET (req, { params }) {
  const { id } = params
  try {
    const post = await postController.getById(id)
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json(error.message, {status: 400} )
  }
}

export async function DELETE(req, { params } ){

  const { id } = params
  try {
    const deletedPost = await postController.deletePostById(id)
    return NextResponse.json(deletedPost)
  } catch (error) {
    return NextResponse.json(error.message, {status: 400})
  }
}