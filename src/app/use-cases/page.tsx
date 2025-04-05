import { Button } from "@/components/ui/button";
import Link from "next/link";

// ISRの設定
export const revalidate = 3600; // 1時間ごとに再生成

export default function UseCasesPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-[#1a293f] mb-8">ユースケースギャラリー</h1>
      <p className="text-lg text-[#798BA6] mb-8">
        様々な業界や目的でCMAがどのように活用されているかをご覧いただけます。
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {/* カードの例 */}
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
            <h3 className="text-xl font-semibold text-[#1a293f] mb-2">ユースケース例 {item}</h3>
            <p className="text-[#798BA6] mb-4">
              このユースケースでは、CMAを使って特定の問題を解決しています。
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