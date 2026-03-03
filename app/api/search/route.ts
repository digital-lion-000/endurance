import { NextResponse } from "next/server";
import { searchRepos } from "@/lib/github";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const sort = (searchParams.get("sort") ?? "stars") as "stars" | "updated";
  const order = (searchParams.get("order") ?? "desc") as "desc" | "asc";
  const page = Number(searchParams.get("page") ?? "1");
  const per_page = Number(searchParams.get("per_page") ?? "10");

  try {
    const data = await searchRepos({ q, sort, order, page, per_page });
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
