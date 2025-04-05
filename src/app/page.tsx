import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { UseCaseGallery } from "@/components/sections/UseCaseGallery";
import { UserExamples } from "@/components/sections/UserExamples";
import { Benchmark } from "@/components/sections/Benchmark";
import { Footer } from "@/components/sections/Footer";
import type { Metadata } from 'next';

// ISRの設定
export const revalidate = 3600; // 1時間ごとに再生成

export const metadata: Metadata = {
  title: 'ホーム',
  description: 'CMAのトップページです',
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[url('/images/bg-3.jpg')] bg-cover bg-center">
      <Header />
      <main className="flex-1">
        <Hero />
        <BeforeAfter />
        <UseCaseGallery />
        <UserExamples />
        <Benchmark />
      </main>
      <Footer />
    </div>
  );
}
