import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// X APIのOAuth 2.0認証コールバックハンドラー
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (!code || !state) {
      console.error("Missing code or state");
      return NextResponse.redirect(
        new URL("/ai-catch-up?error=auth_error", request.url)
      );
    }

    // code_verifierをクッキーから取得
    const cookieStore = await cookies();
    const verifier = cookieStore.get("code_verifier")?.value;
    
    if (!verifier) {
      console.error("Missing code_verifier in cookies");
      return NextResponse.redirect(
        new URL("/ai-catch-up?error=auth_error", request.url)
      );
    }

    // アクセストークンを取得
    const tokenResponse = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${Buffer.from(`${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        code_verifier: verifier,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.X_Callback_URI!,
      }),
    });

    if (!tokenResponse.ok) {
      console.error("Failed to get access token:", await tokenResponse.json());
      return NextResponse.redirect(
        new URL("/ai-catch-up?error=auth_error", request.url)
      );
    }

    const { access_token } = await tokenResponse.json();

    // アクセストークンをクッキーに保存
    const response = NextResponse.redirect(new URL("/ai-catch-up?success=true", request.url));
    response.cookies.set("x_access_token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24時間
    });

    // code_verifierを削除
    response.cookies.delete("code_verifier");

    return response;
  } catch (error) {
    console.error("Error in callback:", error);
    return NextResponse.redirect(
      new URL("/ai-catch-up?error=auth_error", request.url)
    );
  }
}
