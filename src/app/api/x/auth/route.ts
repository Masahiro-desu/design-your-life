import { NextResponse } from "next/server";
import crypto from 'crypto';

export async function GET() {
  try {
    // ランダムなverifierを生成
    const verifier = crypto.randomBytes(32).toString('base64url');
    
    // code_challengeを生成
    const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');
    
    // 認証用URLを作成
    const authUrl = new URL("https://twitter.com/i/oauth2/authorize");
    
    // 必要なパラメータを追加
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("client_id", process.env.X_CLIENT_ID as string);
    authUrl.searchParams.append("redirect_uri", process.env.X_Callback_URI as string);
    authUrl.searchParams.append("scope", "tweet.read users.read offline.access");
    authUrl.searchParams.append("state", crypto.randomBytes(16).toString('hex'));
    authUrl.searchParams.append("code_challenge", challenge);
    authUrl.searchParams.append("code_challenge_method", "S256");
    
    // verifierをセッションに保存するためのレスポンスを作成
    const response = NextResponse.redirect(authUrl.toString());
    
    // Cookieにverifierを保存
    response.cookies.set("code_verifier", verifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 600, // 10分間有効
      path: "/",
    });
    
    return response;
  } catch (error) {
    console.error("Authentication setup error:", error);
    return NextResponse.redirect(new URL("/ai-catch-up?error=auth_setup_error", process.env.NEXT_PUBLIC_URL as string));
  }
} 