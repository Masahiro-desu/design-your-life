import { Metadata } from "next"; 
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | CMA",
  description: "CMAの特定商取引法に基づく表記について説明します。",
};

export default function Legal() {
  return (
    <main className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">特定商取引法に基づく表記</h1>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">販売事業者</th>
                <td className="py-4 px-2 text-gray-700">CMA株式会社</td>
              </tr>
              
              <tr className="border-b">
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">代表者</th>
                <td className="py-4 px-2 text-gray-700">山田 太郎</td>
              </tr>
              
              <tr className="border-b">
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">所在地</th>
                <td className="py-4 px-2 text-gray-700">
                  〒103-0027<br />
                  東京都中央区日本橋1-1-1 CMAビル 5階
                </td>
              </tr>
              
              <tr className="border-b">
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">連絡先</th>
                <td className="py-4 px-2 text-gray-700">
                  電話番号：03-XXXX-XXXX（受付時間：平日9:00〜18:00）<br />
                  メールアドレス：info@cma-agent.jp
                </td>
              </tr>
              
              <tr className="border-b">
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">販売価格</th>
                <td className="py-4 px-2 text-gray-700">
                  各サービス・商品ページに表示された金額（消費税込み）となります。
                </td>
              </tr>
              
              <tr className="border-b">
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">商品代金以外の必要料金</th>
                <td className="py-4 px-2 text-gray-700">
                  サービス利用料金の他に、インターネット接続料金、通信料金などはお客様のご負担となります。
                </td>
              </tr>
              
              <tr className="border-b">
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">お支払い方法</th>
                <td className="py-4 px-2 text-gray-700">
                  クレジットカード決済（VISA、MasterCard、JCB、American Express、Diners Club）<br />
                  銀行振込（先払い）
                </td>
              </tr>
              
              <tr className="border-b">
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">お支払い期限</th>
                <td className="py-4 px-2 text-gray-700">
                  クレジットカード：即時決済<br />
                  銀行振込：注文日より7日以内
                </td>
              </tr>
              
              <tr className="border-b">
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">商品の引渡し時期</th>
                <td className="py-4 px-2 text-gray-700">
                  お支払い確認後、デジタルコンテンツは即時提供、サービスは3営業日以内に開始いたします。
                </td>
              </tr>
              
              <tr className="border-b">
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">返品・キャンセルについて</th>
                <td className="py-4 px-2 text-gray-700">
                  デジタルコンテンツは性質上、購入後の返品・キャンセルはできません。<br />
                  サービスについては契約内容に基づき、解約可能期間や条件が異なります。詳細は各サービスの利用規約をご確認ください。
                </td>
              </tr>
              
              <tr>
                <th className="py-4 px-2 text-left align-top w-1/4 text-gray-700">動作環境</th>
                <td className="py-4 px-2 text-gray-700">
                  <p className="mb-2">推奨ブラウザ：</p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>Google Chrome 最新版</li>
                    <li>Mozilla Firefox 最新版</li>
                    <li>Safari 最新版</li>
                    <li>Microsoft Edge 最新版</li>
                  </ul>
                  <p className="mt-2">※ブラウザの設定でJavaScriptを有効にしてご利用ください。</p>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-8 text-right text-sm text-gray-500">
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