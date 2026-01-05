import { NextResponse } from "next/server";
import { getLatestScript } from "@/lib/memory";

export async function GET() {
  const data = await getLatestScript();
  if (!data) {
    return NextResponse.json({ error: "No script available" }, { status: 404 });
  }
  return NextResponse.json(data);
}
