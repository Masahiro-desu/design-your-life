'use client';

import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 px-6 flex flex-col justify-between items-center border-b sticky top-0 z-50 bg-background/95 backdrop-blur"
    >
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src="/logo_long.png" 
              alt="CMA" 
              width={100} 
              height={30}
              className="mr-8 rounded-md"
            />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-sm text-[#798BA6] hover:text-[#1a293f]">
              ホーム
            </Link>
            <Link href="/ai-catch-up" className="text-sm text-[#798BA6] hover:text-[#1a293f]">
              AI情報収集
            </Link>
            <Link href="/about" className="text-sm text-[#798BA6] hover:text-[#1a293f]">
              会社概要
            </Link>
            <Link href="/services" className="text-sm text-[#798BA6] hover:text-[#1a293f]">
              サービス
            </Link>
            <Link href="/contact" className="text-sm text-[#798BA6] hover:text-[#1a293f]">
              お問い合わせ
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm hidden md:inline-block text-[#798BA6]">
                {user.username || user.emailAddresses[0]?.emailAddress}
              </span>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-9 h-9',
                  }
                }}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-[#798BA6] hover:text-[#1a293f]">
                  ログイン
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-[#1a293f] hover:bg-[#1a293f]/90 text-white rounded-full">
                  サインアップ
                </Button>
              </SignUpButton>
            </div>
          )}
          
          {/* ハンバーガーメニューボタン（モバイル表示用） */}
          <button 
            className="md:hidden text-[#798BA6] hover:text-[#1a293f] focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden w-full mt-4 pb-2 animate-slide-in-top">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="text-sm text-[#798BA6] hover:text-[#1a293f] py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link 
              href="/ai-catch-up" 
              className="text-sm text-[#798BA6] hover:text-[#1a293f] py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              AI情報収集
            </Link>
            <Link 
              href="/about" 
              className="text-sm text-[#798BA6] hover:text-[#1a293f] py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              会社概要
            </Link>
            <Link 
              href="/services" 
              className="text-sm text-[#798BA6] hover:text-[#1a293f] py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              サービス
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-[#798BA6] hover:text-[#1a293f] py-2 px-4 rounded-md hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
      )}
    </motion.div>
  );
} 