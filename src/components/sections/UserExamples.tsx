'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

// ユーザー事例のダミーデータ
const userExamples = [
  {
    id: 1,
    title: "営業チームでの活用事例",
    description: "顧客データや販売履歴を学習させることで、営業担当者が過去の成功事例を参照し、効果的な提案ができるようになりました。"
  },
  {
    id: 2,
    title: "カスタマーサポートの改善",
    description: "問い合わせ対応のナレッジベースをAIに学習させ、回答の品質と速度を向上。顧客満足度が20%向上しました。"
  },
  {
    id: 3,
    title: "社内マニュアルの効率化",
    description: "複雑な業務手順をAIにインプットすることで、新入社員のトレーニング期間を半分に短縮しました。"
  },
  {
    id: 4,
    title: "在宅勤務の情報共有",
    description: "リモートワーク環境でも、必要な情報に素早くアクセスできるようになり、チーム間のコミュニケーションが円滑になりました。"
  },
  {
    id: 5,
    title: "研究開発チームの知識管理",
    description: "過去の研究結果や実験データをAIに学習させることで、新しいプロジェクトの立ち上げ時間を30%短縮しました。"
  },
  {
    id: 6,
    title: "人事部門での採用効率化",
    description: "採用基準や面接のベストプラクティスをAIに学習させ、採用プロセスの一貫性と質を向上させました。"
  },
  {
    id: 7,
    title: "IT部門のトラブルシューティング",
    description: "過去の障害対応事例をAIに学習させることで、一般的な問題の解決時間を大幅に短縮することができました。"
  },
  {
    id: 8,
    title: "マーケティングの分析支援",
    description: "過去のキャンペーン結果やユーザー行動データを分析し、効果的なマーケティング戦略の立案をサポートしています。"
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function UserExamples() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4">他の人がCMAをどのように使っているか見てみましょう</h2>
          <p className="text-[#798BA6] max-w-2xl mx-auto">
            さまざまな組織や個人がCMAをどのように活用しているかをご紹介します。<br />
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {userExamples.map((example) => (
            <motion.div 
              key={example.id}
              variants={item}
              className="bg-white rounded-lg p-4 border"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-[#1a293f] rounded-full mb-4 flex items-center justify-center text-white">
                {example.id}
              </div>
              <h3 className="font-medium mb-2">{example.title}</h3>
              <p className="text-sm text-[#798BA6]">
                {example.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/how-others-use">
            <Button variant="outline" className="rounded-full border-[#1a293f] text-[#1a293f]">
              もっと見る →
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 