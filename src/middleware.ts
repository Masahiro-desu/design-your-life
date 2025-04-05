import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// 実装済みのパスを定義
const implementedRoutes = [
  "/",
  "/api(.*)", 
  "/login(.*)", 
  "/signup(.*)",
  "/info/terms(.*)", 
  "/info/privacy-policy(.*)",
  "/info/legal(.*)",
  "/profile(.*)",
  "/how-others-use(.*)",
  "/use-cases(.*)",
  "/ai-catch-up(.*)"
];

// パブリックルートのマッチャーを作成
const publicRoutes = createRouteMatcher([
  "/", 
  "/api/webhook(.*)", 
  "/api(.*)", 
  "/login", 
  "/signup", 
  "/about", 
  "/contact", 
  "/terms(.*)", 
  "/privacy-policy(.*)",
  "/legal(.*)",
  "/how-others-use(.*)",
  "/use-cases(.*)"
]);

// 実装済みルートのマッチャーを作成
const implementedRoutesPattern = createRouteMatcher(implementedRoutes);

export default clerkMiddleware(async (auth, req) => {
  // 実装されていないページをトップページにリダイレクト
  if (!implementedRoutesPattern(req)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  
  if (publicRoutes(req)) {
    return; // パブリックルートはそのまま通す
  }
  
  // 認証が必要なルートを保護
  await auth.protect();
});

export const config = {
  matcher: [
    // Next.jsの内部ファイルと静的ファイルをスキップ
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // APIルートは常に実行
    '/(api|trpc)(.*)',
  ],
};