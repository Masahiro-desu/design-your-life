'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-5xl md:text-6xl font-semibold mb-6 tracking-medium font-serif"
        style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
      >
        Create My Agent
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-[#798BA6] text-lg max-w-2xl mx-auto mb-16 leading-relaxed"
      >
        もっと多くの人がアイデアを形にする世の中へ。<br />
        CMAは、MVPの開発補助・業務効率化ツールの提供・AIの最新情報発信を通して<br />
        あなたのアイデアを30分以内に形にします。
      </motion.p>
      
      {/* 動画/イメージセクション */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative max-w-4xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-xl"
      >
        <motion.div 
          className="relative aspect-video bg-[#1a293f]/5 rounded-2xl overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80" 
            alt="Introducing Create My Agent" 
            fill
            className="object-cover"
            quality={90}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="#1a293f"/>
              </svg>
            </div>
          </motion.div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h2 className="text-3xl font-bold font-serif" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>Introducing<br />Create My Agent</h2>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <a href="https://buy.stripe.com/test_fZe7tRfJ588LdnG000" target="_blank" rel="noopener noreferrer">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button 
              size="lg" 
              className="bg-[#1a293f] hover:bg-[#1a293f]/90 text-white rounded-xl px-12 py-8 text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              CMAを試す
            </Button>
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
} 