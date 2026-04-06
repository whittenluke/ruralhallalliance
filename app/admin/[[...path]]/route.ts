import fs from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

const adminRoot = path.resolve(process.cwd(), "public", "admin");

function contentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".yml" || ext === ".yaml") return "text/yaml; charset=utf-8";
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  return "application/octet-stream";
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  const segments = params.path ?? [];
  if (segments.some((s) => s === ".." || s.includes("/") || s.includes("\\"))) {
    return new NextResponse("Not found", { status: 404 });
  }

  const filePath =
    segments.length === 0
      ? path.join(adminRoot, "index.html")
      : path.resolve(adminRoot, ...segments);

  const relativeToAdmin = path.relative(adminRoot, filePath);
  if (relativeToAdmin.startsWith("..") || path.isAbsolute(relativeToAdmin)) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return new NextResponse("Not found", { status: 404 });
  }

  const body = fs.readFileSync(filePath);
  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType(filePath),
      "Cache-Control": "private, no-cache, no-store, max-age=0"
    }
  });
}
