import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    value: 50,
    method: request.method,
  });
}