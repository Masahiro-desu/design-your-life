import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "個人情報取扱 | CMA",
  description: "CMAの個人情報取扱について説明します。",
};

export default function PrivacyPolicy() {
  return (
    <main className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">個人情報取扱について</h1>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. 個人情報の取得について</h2>
            <p className="text-gray-700 mb-4">
              当社は、お客様との取引、お問い合わせやサービスの提供を通じて、必要な範囲で個人情報を取得いたします。
              個人情報の取得にあたっては、適法かつ公正な手段によって行い、お客様の意思に反する方法で取得することはありません。
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. 個人情報の利用目的</h2>
            <p className="text-gray-700 mb-4">
              取得した個人情報は、以下の目的で利用いたします。
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>ご注文いただいた商品・サービスの提供のため</li>
              <li>お問い合わせへの対応のため</li>
              <li>新しいサービスや製品の開発のため</li>
              <li>お客様に有用と思われる情報の提供のため</li>
              <li>サービスの品質向上のため</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. 個人情報の安全管理</h2>
            <p className="text-gray-700 mb-4">
              当社は、取得した個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
              また、個人情報を取り扱う従業員や委託先に対して、個人情報の安全管理が図られるよう、必要かつ適切な監督を行います。
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. 個人情報の第三者提供</h2>
            <p className="text-gray-700 mb-4">
              当社は、法令に基づく場合を除き、お客様の同意を得ないで個人情報を第三者に提供することはありません。
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. 個人情報の開示・訂正・削除</h2>
            <p className="text-gray-700 mb-4">
              お客様ご自身の個人情報の開示・訂正・削除をご希望される場合は、お申し出いただければ、ご本人であることを確認の上、適切に対応いたします。
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">6. お問い合わせ窓口</h2>
            <p className="text-gray-700 mb-4">
              個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。
            </p>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-medium">CMA株式会社 個人情報保護管理者</p>
              <p>Email: privacy@cma-agent.jp</p>
              <p>電話: 03-XXXX-XXXX（受付時間：平日9:00〜18:00）</p>
            </div>
          </section>
          
          <div className="mt-8 text-right text-sm text-gray-500">
            制定日: 2024年3月1日<br />
            最終更新日: 2024年3月21日
          </div>
        </div>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="text-sm">トップに戻る</span>
          </Link>
        </div>
      </div>
    </main>
  );
} 