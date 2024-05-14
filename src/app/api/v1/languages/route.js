import { languagesController } from "@/controllers/languages/languagesController";
import { NextResponse } from "next/server";

export async function GET(req,res) {
  try {
    const response = await languagesController.getAllLanguages()
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(error.message, {
      status: 400
    })
  }
}
