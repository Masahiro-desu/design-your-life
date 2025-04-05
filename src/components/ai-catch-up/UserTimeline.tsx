"use client";

import { useEffect, useRef, useState } from "react";

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

// Xのウィジェット用の型定義
interface TwitterWidgets {
  createTimeline: (
    options: { sourceType: string; screenName?: string },
    element: HTMLElement,
    parameters?: {
      height?: number;
      theme?: "light" | "dark";
      tweetLimit?: number;
      chrome?: string;
      dnt?: boolean;
    }
  ) => Promise<HTMLElement>;
}

// グローバル型定義の拡張
declare global {
  interface Window {
    twttr?: { widgets: TwitterWidgets };
  }
}

interface UserTimelineProps {
  username?: string;
  height?: number;
  theme?: "light" | "dark";
  limit?: number;
}

export default function UserTimeline({
  username = TWITTER_USERS[0],
  height = 600,
  theme = "light",
  limit = 5,
}: UserTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const widgetKey = useRef<string>(`twitter-${username}-${theme}-${Date.now()}`);

  // Twitterスクリプトのロード処理
  useEffect(() => {
    // 既にスクリプトが読み込まれている場合はスキップ
    if (typeof window !== "undefined" && window.twttr) {
      setIsScriptLoaded(true);
      return;
    }

    // スクリプトが既に追加されているか確認
    const existingScript = document.querySelector('script[src="https://platform.x.com/widgets.js"]');
    if (existingScript) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.x.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    script.onerror = () => {
      console.error("Twitter widget script failed to load");
      setIsLoading(false);
    };
    
    document.body.appendChild(script);

    // スクリプトの削除は行わない（他のコンポーネントが使用している可能性があるため）
  }, []);

  // タイムラインの初期化
  useEffect(() => {
    if (!isScriptLoaded) return;

    setIsLoading(true);
    
    // 新しいコンテナを作成してキーを更新
    widgetKey.current = `twitter-${username}-${theme}-${Date.now()}`;
    
    // DOMの処理は確実にマウント後に行う
    const timeoutId = setTimeout(() => {
      if (!window.twttr || !containerRef.current) {
        setIsLoading(false);
        return;
      }

      // 新しいタイムラインを作成する前に、コンテナを空にする
      // Reactの管理下にない要素を扱うため、空のdivを設定
      const timelineContainer = document.createElement('div');
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(timelineContainer);

      try {
        window.twttr.widgets.createTimeline(
          {
            sourceType: "profile",
            screenName: username,
          },
          timelineContainer,
          {
            height,
            theme,
            tweetLimit: limit,
            chrome: "noheader, nofooter",
            dnt: true,
          }
        ).then(() => {
          setIsLoading(false);
        }).catch((error: Error) => {
          console.error("Twitter widget failed to initialize:", error);
          setIsLoading(false);
        });
      } catch (error: unknown) {
        console.error("Error creating Twitter timeline:", error);
        setIsLoading(false);
      }
    }, 100); // 少し長めのタイムアウトでDOM更新を待つ

    return () => {
      clearTimeout(timeoutId);
    };
  }, [username, height, theme, limit, isScriptLoaded]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-lg overflow-hidden shadow-md">
      <div className="p-2 bg-blue-50 border-b border-blue-100">
        <h3 className="font-medium text-blue-700">@{username}さんのタイムライン</h3>
      </div>
      <div className="bg-white min-h-[200px] relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="text-center text-gray-500">
              タイムラインを読み込み中...
            </div>
          </div>
        )}
        <div 
          ref={containerRef}
          key={widgetKey.current}
          className="w-full h-full min-h-[200px]"
          aria-label={`${username}のタイムライン`}
        />
      </div>
    </div>
  );
}
