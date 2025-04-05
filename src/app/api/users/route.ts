import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { auth } from "@clerk/nextjs/server";

// GETリクエスト: 現在のユーザー情報を取得
export async function GET() {
  try {
    const { userId } = await auth();
    
    // 認証チェック
    if (!userId) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    // ユーザー情報を取得
    const user = await prisma.user_db.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが見つかりません" },
        { status: 404 }
      );
    }

    // 機密情報を除外して返却
    const safeUser = Object.fromEntries(
      Object.entries(user).filter(([key]) => key !== 'password_hash')
    );
    
    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("ユーザー情報取得エラー:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
} 