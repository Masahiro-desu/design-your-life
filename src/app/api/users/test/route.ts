import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismaClient";

// 開発環境限定のテスト用APIです。本番環境では削除してください。
// テスト用にユーザーを作成またはupdated_atを更新するAPI
export async function POST(req: NextRequest) {
  // 本番環境チェック
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "このエンドポイントは開発環境でのみ利用可能です" },
      { status: 403 }
    );
  }

  try {
    const data = await req.json();
    const { user_id, email, user_name, action } = data;

    // 必須パラメータのチェック
    if (!user_id || !email) {
      return NextResponse.json(
        { error: "user_idとemailは必須です" },
        { status: 400 }
      );
    }

    // ユーザーが存在するか確認
    const existingUser = await prisma.user_db.findUnique({
      where: { user_id }
    });

    if (existingUser && action === "update") {
      // 既存ユーザーのupdated_atを更新
      const updatedUser = await prisma.user_db.update({
        where: { user_id },
        data: {
          // 何も指定しなくてもupdated_atは更新される
        }
      });
      
      return NextResponse.json({
        message: "ユーザーのupdated_atを更新しました",
        user: updatedUser
      });
    } else if (!existingUser && action === "create") {
      // 新規ユーザーを作成
      const newUser = await prisma.user_db.create({
        data: {
          user_id,
          email,
          user_name: user_name || "テストユーザー",
          password_hash: "test_hash",
          device_type: "test_device"
        }
      });

      return NextResponse.json({
        message: "テストユーザーを作成しました",
        user: newUser
      });
    } else if (existingUser && action === "create") {
      return NextResponse.json(
        { error: "既に存在するユーザーIDです", user: existingUser },
        { status: 400 }
      );
    } else if (!existingUser && action === "update") {
      return NextResponse.json(
        { error: "更新対象のユーザーが見つかりません" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(
        { error: "actionパラメータには'create'または'update'を指定してください" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("テストAPI実行エラー:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
} 