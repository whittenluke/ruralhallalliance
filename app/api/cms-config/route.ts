import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const configPath = path.join(process.cwd(), "public", "admin", "config.yml");

export async function GET() {
  try {
    if (!fs.existsSync(configPath)) {
      return new NextResponse("config.yml not found", { status: 404 });
    }
    const body = fs.readFileSync(configPath, "utf8");
    return new NextResponse(body, {
      status: 200,
      headers: {
        "Content-Type": "text/yaml; charset=utf-8",
        "Cache-Control": "private, no-cache, no-store, max-age=0"
      }
    });
  } catch {
    return new NextResponse("Failed to read config", { status: 500 });
  }
}
