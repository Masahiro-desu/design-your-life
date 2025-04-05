'use client';

import { useState } from 'react';
import { User } from '@clerk/nextjs/server';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface UserData {
  user_id: string;
  email: string;
  user_name: string | null;
  device_type: string | null;
  created_at: Date;
  updated_at: Date;
}

interface ProfileFormProps {
  user: UserData | null;
  clerkUser: User;
}

export function ProfileForm({ user, clerkUser }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: user?.user_name || '',
  });

  // 入力フィールドの変更を処理
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // フォーム送信を処理
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Prismaでプロフィール情報を更新
      const response = await fetch(`/api/users/${user.user_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: formData.user_name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      // 成功時にページをリフレッシュ
      router.refresh();
      alert('プロフィールを更新しました');
    } catch (error) {
      console.error('プロフィール更新中にエラーが発生しました:', error);
      alert('プロフィールの更新に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        {clerkUser.imageUrl ? (
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image
              src={clerkUser.imageUrl}
              alt={clerkUser.username || 'Profile'}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground">
              {formData.user_name[0]?.toUpperCase() || 'U'}
            </span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-medium">{formData.user_name}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="user_name" className="block text-sm font-medium">
            ユーザー名
          </label>
          <input
            id="user_name"
            name="user_name"
            type="text"
            value={formData.user_name}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
          />
          <p className="text-xs text-muted-foreground">
            他のユーザーに表示される一意のユーザー名
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? '更新中...' : 'プロフィールを更新'}
        </button>
      </form>
    </div>
  );
} 