import { Button } from "@/components/ui/button";
import Link from "next/link";

// ISRの設定
export const revalidate = 3600; // 1時間ごとに再生成

export default function HowOthersUsePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-[#1a293f] mb-8">他の人がCMAをどのように使っているか</h1>
      <p className="text-lg text-[#798BA6] mb-8">
        実際のユーザーの事例とフィードバックをご紹介します。
      </p>
      
      <div className="space-y-12 mt-12">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h3 className="text-xl font-semibold text-[#1a293f]">ユーザー {item}</h3>
                <p className="text-[#798BA6]">企業名 / 業種</p>
              </div>
            </div>
            <blockquote className="text-lg italic text-[#1a293f] mb-6">
              &ldquo;CMAを使うことで業務効率が大幅に向上しました。特に〇〇の機能が非常に役立っています。&rdquo;
            </blockquote>
            <p className="text-[#798BA6]">
              具体的な活用方法や成果についての詳細な説明がここに入ります。CMAの特定の機能がどのように問題解決に貢献したかなど。
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/">
          <Button className="bg-[#1a293f] hover:bg-[#1a293f]/90 text-white">
            ホームに戻る
          </Button>
        </Link>
      </div>
    </div>
  );
} 