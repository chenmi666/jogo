import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slugs } = body as { slugs?: string[] }

    if (!Array.isArray(slugs) || slugs.length === 0) {
      return NextResponse.json({ error: "slugs array required" }, { status: 400 })
    }

    for (const slug of slugs) {
      revalidatePath(`/${slug}/`, "page")
    }

    return NextResponse.json({ revalidated: true, slugs })
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 })
  }
}
