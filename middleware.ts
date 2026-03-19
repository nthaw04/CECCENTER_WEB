import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Lấy protocol từ header x-forwarded-proto (do reverse proxy gửi lên)
  const proto = request.headers.get("x-forwarded-proto");

  // Nếu request đến qua HTTP, redirect sang HTTPS
  if (proto === "http") {
    const httpsUrl = `https://${request.headers.get("host")}${request.nextUrl.pathname}${request.nextUrl.search}`;
    return NextResponse.redirect(httpsUrl, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Áp dụng cho tất cả routes, bỏ qua static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
