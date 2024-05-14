import { categoryController } from "@/controllers/categories/categoriesController";
import { NextResponse } from "next/server";

export async function GET(req, {params}){
  const { category } = params
  try {
    const posts = await categoryController.getPostsFromCategoryName(category)
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}