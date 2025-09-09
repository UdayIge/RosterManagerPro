import { NextResponse } from "next/server";

export async function GET() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(new URL("/mock/roster.json", baseURL).toString());
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch roster data" },
      { status: 500 }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}
