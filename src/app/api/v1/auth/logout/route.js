import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET (req) {
  const cookieStore = cookies();
  const token = cookieStore.get("sessionToken");

  if (!token) {
    return NextResponse.json({
      message: "Not logged in",
    }, {
      status: 401,
    })
  }
  try {
    cookieStore.delete("sessionToken");
    const response = NextResponse.json(
      {},
      {
        status: 200,
      }
    );
    return response;
  } catch (error) {
    return NextResponse.json({status: 500});
  }
}