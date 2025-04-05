'use client';

import { motion } from "framer-motion";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1a293f] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <p className="text-sm text-gray-300 max-w-xs">
              Create My Agent
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-gray-700 text-sm text-gray-300 flex flex-col md:flex-row justify-between items-center"
        >
          <p>&copy; {new Date().getFullYear()} CMA, Inc. All rights reserved.</p>
          <div className="flex flex-wrap space-x-4 md:space-x-6 mt-4 md:mt-0">
            <Link href="/about" className="hover:text-white transition-colors">会社概要</Link>
            <Link href="/services" className="hover:text-white transition-colors">サービス</Link>
            <Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link>
            <Link href="/info/privacy-policy" className="hover:text-white transition-colors">個人情報取扱</Link>
            <Link href="/info/legal" className="hover:text-white transition-colors">特商法の記載</Link>
            <Link href="/info/terms" className="hover:text-white transition-colors">利用規約</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 