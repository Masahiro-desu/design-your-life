// import Link from "next/link"; // 未使用のため削除

export default function Footer() {
  return (
    <footer className="py-6 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} AI Catch-up. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              X (Twitter)
            </a>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-400 text-center">
          このサイトはX (Twitter) のAPIを使用しています。コンテンツはそれぞれの著作者に帰属します。
        </div>
      </div>
    </footer>
  );
}
