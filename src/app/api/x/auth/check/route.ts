import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("x_access_token")?.value;

    if (!accessToken) {
      return NextResponse.json({ isAuthenticated: false });
    }

    // トークンの有効性を確認
    const response = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ isAuthenticated: false });
    }

    return NextResponse.json({ isAuthenticated: true });
  } catch (error) {
    console.error("Error checking auth status:", error);
    return NextResponse.json({ isAuthenticated: false });
  }
} 