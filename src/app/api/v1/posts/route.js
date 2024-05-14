import { postController } from '@/controllers/posts/postsController';
import { NextResponse } from 'next/server';


export async function GET(req, res){
  try {
    const response = await postController.get(req)
    return NextResponse.json(response)

  } catch (error) {
    console.error(error)
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}

export async function POST(req, res){
  try {
    const createdPost = await postController.create(req)
    return NextResponse.json(createdPost)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}

export async function PUT(req,res){
  try {
    const updatedPost = await postController.updatePost(req)
    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}

export async function DELETE(req, res){
  try {
    const deletedPost = await postController.delete(req)
    return NextResponse.json({deletedPost})
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}