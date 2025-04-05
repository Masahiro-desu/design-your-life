import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/profile/profile-form';
import { prisma } from '@/lib/prismaClient';
import { currentUser } from '@clerk/nextjs/server';

// 動的レンダリング（ユーザーデータに依存するため）
export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Prismaからユーザー情報を取得
  const userData = await prisma.user_db.findUnique({
    where: { user_id: user.id },
  });

  if (!userData) {
    const email = user.emailAddresses[0]?.emailAddress;
    const username = user.username || (email ? email.split('@')[0] : '');

    // 新規ユーザーを作成
    await prisma.user_db.create({
      data: {
        user_id: user.id,
        email: email || '',
        user_name: username,
        password_hash: 'default_hash',
        device_type: 'web'
      }
    });
  }

  // 最新のデータを取得
  const latestUserData = await prisma.user_db.findUnique({
    where: { user_id: user.id },
  });

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">プロフィール</h1>
      <div className="max-w-2xl">
        <ProfileForm user={latestUserData} clerkUser={user} />
      </div>
    </div>
  );
}