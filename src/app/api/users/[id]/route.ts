import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    // searchParamsはrequest.nextUrl.searchParamsから取得
    const searchParams = request.nextUrl.searchParams;
    const fields = searchParams.get("fields")?.split(",") || [];
    const includePassword = searchParams.get("includePassword") === "true";

    // await して params を解決する
    const { id } = await params;

    // ユーザー情報を取得（管理者向けAPI）
    const user = await prisma.user_db.findUnique({
      where: { user_id: id },
      ...(fields.length > 0 && {
        select: fields.reduce((acc, field) => ({ ...acc, [field]: true }), {}),
      }),
    });

    if (!user) {
      return NextResponse.json({ error: "ユーザーが見つかりません" }, { status: 404 });
    }

    // 機密情報の除外（includePasswordがtrueの場合は除外しない）
    const safeUser = includePassword
      ? user
      : Object.fromEntries(
          Object.entries(user).filter(([key]) => key !== "password_hash")
        );

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error("ユーザー情報取得エラー:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}