import { PrismaClient } from "@prisma/client";

// PrismaClientのグローバルインスタンスを作成（開発時のホットリロード対策）
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

// 開発環境でのホットリロード時に複数のPrismaインスタンスが作成されるのを防ぐ
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// デフォルトエクスポートも追加
export default prisma; 