"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Header from "@/components/detail-sections/Header";
import Footer from "@/components/detail-sections/Footer";
import MarkdownEditor from "@/components/ai-catch-up/MarkdownEditor";
import { ExternalLink, Search } from "lucide-react";

// ユーザーリスト
const TWITTER_USERS = [
  "masahirochaen",
  "minchoi",
  "sama",
  "OpenAI",
  "shota7180",
  "Google",
  "GeminiApp",
  "elonmusk",
  "SuguruKun_ai",
];

// X(旧Twitter)検索URL生成関数
const getXSearchUrl = (username: string) => {
  return `https://x.com/search?q=from%3A%40${username}&src=typed_query&f=live`;
};

// UserTimelineを動的にインポート
const UserTimeline = dynamic(
  () => import("@/components/ai-catch-up/UserTimeline"),
  {
    loading: () => <TimelineSkeleton />, // ローディング中にスケルトンを表示
    ssr: false, // サーバーサイドレンダリングを無効化 (クライアントサイドでのみレンダリング)
  }
);

// タイムライン用スケルトンローダー
function TimelineSkeleton() {
  return (
    <div className="w-full max-w-xl mx-auto rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="p-2 bg-blue-50 border-b border-blue-100">
        <div className="h-4 bg-blue-200 rounded w-3/4"></div>
      </div>
      <div className="bg-white p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AICatchUpPage() {
  const [selectedUser, setSelectedUser] = useState(TWITTER_USERS[0]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // テーマの切り替え
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* ヘッダーセクション */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  AIリーダーのタイムライン
                </h2>
                <p className="text-gray-600 mt-1">
                  AIに関する最新の動向やニュースをチェック
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="表示するユーザーを選択"
                >
                  {TWITTER_USERS.map((user) => (
                    <option key={user} value={user}>
                      @{user}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={toggleTheme}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors"
                  aria-label={`${theme === "light" ? "ダーク" : "ライト"}モードに切り替え`}
                >
                  {theme === "light" ? "ダークモード" : "ライトモード"}
                </button>
              </div>
            </div>
            
            {/* メインコンテンツエリア：タイムラインとエディタを横並びにする */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* タイムラインセクション (左側) */}
              <div className="lg:w-1/2">
                <UserTimeline 
                  username={selectedUser} 
                  theme={theme}
                  height={650}
                  limit={10}
                />
              </div>
              
              {/* メモセクション (右側) */}
              <div className="lg:w-1/2">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  メモを取る
                </h3>
                <p className="text-gray-600 mb-6">
                  タイムラインを見ながらメモを取れます (Markdown対応)。
                </p>
                <MarkdownEditor maxLength={500} storageKey="twitter-timeline-notes" />
              </div>
            </div>
            
            {/* 情報セクション */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                AI研究者・組織のX アカウント
              </h3>
              <p className="text-gray-700 mb-5">
                以下のリンクから各アカウントの投稿を直接確認できます。
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TWITTER_USERS.map((user) => (
                  <a 
                    key={user}
                    href={getXSearchUrl(user)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-blue-300 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-gray-100 transition-colors overflow-hidden">
                      <Image 
                        src="/images/x-logo.png" 
                        alt="X Logo" 
                        width={24} 
                        height={24} 
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium text-gray-800 group-hover:text-blue-600">@{user}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Search size={12} /> 
                        <span>投稿を見る</span>
                      </p>
                    </div>
                    <ExternalLink size={16} className="text-gray-400 group-hover:text-blue-500" />
                  </a>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-gray-700 text-sm flex items-center gap-1.5">
                  <Image 
                    src="/images/x-logo.png" 
                    alt="X Logo" 
                    width={16} 
                    height={16} 
                    className="object-contain"
                  />
                  詳しくは<a 
                    href="https://developer.x.com/en/docs/x-for-websites" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    X開発者ドキュメント
                    <ExternalLink size={12} />
                  </a>をご覧ください。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
