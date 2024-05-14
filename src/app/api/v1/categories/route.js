import { categoryController } from "@/controllers/categories/categoriesController";
import { NextResponse } from "next/server";

export async function GET(req,res) {
  try {
    const response = await categoryController.get(req)
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}

export async function POST(req, res){
  try {
    const createdCategory = await categoryController.createCategory(req)
    return NextResponse.json(createdCategory)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}