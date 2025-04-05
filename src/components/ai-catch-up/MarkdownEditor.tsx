"use client";

import { useState, useRef, useEffect } from "react";
import { ClipboardCopy, Check, HelpCircle, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

interface MarkdownEditorProps {
  maxLength?: number;
  storageKey?: string;
}

export default function MarkdownEditor({ maxLength = 500, storageKey = "markdown-notes" }: MarkdownEditorProps) {
  const [text, setText] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ローカルストレージからデータを読み込む
  useEffect(() => {
    const savedText = localStorage.getItem(storageKey);
    if (savedText) {
      setText(savedText);
    }
  }, [storageKey]);

  // テキストエリアの高さを動的に調整
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(200, textareaRef.current.scrollHeight)}px`;
    }
  }, [text]);

  // テキスト変更時にローカルストレージに保存
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
      localStorage.setItem(storageKey, newText);
    }
  };

  // メモをクリアする関数
  const clearText = () => {
    if (window.confirm("メモをクリアしてもよろしいですか？")) {
      setText("");
      localStorage.removeItem(storageKey);
    }
  };

  const copyToClipboard = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("クリップボードへのコピーに失敗しました", err);
      }
    }
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const insertMarkdownSyntax = (syntax: string, placeholder: string) => {
    if (!textareaRef.current) return;
    
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const selectedText = text.substring(start, end);
    
    let newText;
    if (selectedText) {
      // 選択されたテキストを構文で囲む
      newText = text.substring(0, start) + syntax.replace(placeholder, selectedText) + text.substring(end);
    } else {
      // 何も選択されていなければ、プレースホルダーを挿入
      newText = text.substring(0, start) + syntax + text.substring(end);
    }
    
    if (newText.length <= maxLength) {
      setText(newText);
      localStorage.setItem(storageKey, newText);
      
      // カーソル位置を調整
      setTimeout(() => {
        if (textareaRef.current) {
          const newCursorPos = start + syntax.indexOf(placeholder) + (selectedText ? selectedText.length : placeholder.length);
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(
            selectedText ? start + syntax.indexOf(placeholder) : start + syntax.indexOf(placeholder),
            newCursorPos
          );
        }
      }, 0);
    }
  };

  const remainingChars = maxLength - text.length;
  const remainingPercentage = (remainingChars / maxLength) * 100;
  const isNearLimit = remainingPercentage < 20;

  const placeholderText = `# タイトル
## 見出し1
- その1
- その2
- その3
## 見出し2`;

  const markdownHelpText = `
## マークダウン記法の基本

### 見出し
# 見出し1
## 見出し2
### 見出し3

### リスト
- 箇条書き1
- 箇条書き2
  - ネスト1
  - ネスト2

1. 番号付き1
2. 番号付き2

### 装飾
**太字**
*イタリック*
~~打ち消し線~~

### リンク
[リンクテキスト](https://example.com)

### 引用
> 引用文

### コード
\`インラインコード\`

\`\`\`
コードブロック
\`\`\`
`;

  // Reactコンポーネントを定義
  const components: Components = {
    h1: ({...props}) => <h1 className="text-xl font-bold my-2" {...props} />,
    h2: ({...props}) => <h2 className="text-lg font-semibold my-2" {...props} />,
    h3: ({...props}) => <h3 className="text-md font-medium my-1" {...props} />,
    p: ({...props}) => <p className="my-1" {...props} />,
    ul: ({...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
    ol: ({...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
    li: ({...props}) => <li className="my-0.5" {...props} />,
    a: ({...props}) => <a className="text-blue-500 hover:underline" {...props} target="_blank" rel="noopener noreferrer" />,
    blockquote: ({...props}) => <blockquote className="border-l-4 border-gray-200 pl-4 italic my-2" {...props} />,
    code: ({className, children, ...props}) => {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <code className="block bg-gray-100 rounded p-2 my-2 text-sm whitespace-pre-wrap" {...props}>
          {children}
        </code>
      ) : (
        <code className="bg-gray-100 rounded px-1 py-0.5 text-sm" {...props}>
          {children}
        </code>
      );
    },
    pre: ({...props}) => <pre className="bg-gray-100 rounded p-2 my-2 text-sm overflow-auto" {...props} />,
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-800">メモ</h3>
          <p className="text-sm text-gray-600">Markdown形式で入力できます</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearText}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            aria-label="メモをクリア"
            title="メモをクリア"
          >
            <X size={18} />
          </button>
          <button
            onClick={toggleHelp}
            className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
            aria-label="マークダウンヘルプ"
            title="マークダウン記法のヘルプ"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </div>

      <div className="p-4 relative">
        {/* マークダウンツールバー */}
        <div className="flex flex-wrap gap-1 mb-2 bg-gray-50 p-1 rounded-t-md border border-gray-300">
          <button 
            className="p-1 text-gray-700 hover:bg-gray-200 rounded"
            onClick={() => insertMarkdownSyntax("# テキスト", "テキスト")}
            title="見出し1"
          >
            H1
          </button>
          <button 
            className="p-1 text-gray-700 hover:bg-gray-200 rounded"
            onClick={() => insertMarkdownSyntax("## テキスト", "テキスト")}
            title="見出し2"
          >
            H2
          </button>
          <button 
            className="p-1 text-gray-700 hover:bg-gray-200 rounded"
            onClick={() => insertMarkdownSyntax("**テキスト**", "テキスト")}
            title="太字"
          >
            B
          </button>
          <button 
            className="p-1 italic text-gray-700 hover:bg-gray-200 rounded"
            onClick={() => insertMarkdownSyntax("*テキスト*", "テキスト")}
            title="イタリック"
          >
            I
          </button>
          <button 
            className="p-1 text-gray-700 hover:bg-gray-200 rounded"
            onClick={() => insertMarkdownSyntax("- テキスト", "テキスト")}
            title="箇条書き"
          >
            •
          </button>
          <button 
            className="p-1 text-gray-700 hover:bg-gray-200 rounded"
            onClick={() => insertMarkdownSyntax("1. テキスト", "テキスト")}
            title="番号付きリスト"
          >
            1.
          </button>
          <button 
            className="p-1 text-gray-700 hover:bg-gray-200 rounded"
            onClick={() => insertMarkdownSyntax("[テキスト](URL)", "テキスト")}
            title="リンク"
          >
            🔗
          </button>
          <button 
            className="p-1 text-gray-700 hover:bg-gray-200 rounded"
            onClick={() => insertMarkdownSyntax("> テキスト", "テキスト")}
            title="引用"
          >
            &quot;
          </button>
          <button 
            className="p-1 text-gray-700 hover:bg-gray-200 rounded font-mono"
            onClick={() => insertMarkdownSyntax("`テキスト`", "テキスト")}
            title="インラインコード"
          >
            `
          </button>
          <button 
            className="p-1 text-gray-700 hover:bg-gray-200 rounded font-mono"
            onClick={() => insertMarkdownSyntax("```\nテキスト\n```", "テキスト")}
            title="コードブロック"
          >
            ```
          </button>
        </div>
        
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder={placeholderText}
          className="w-full min-h-[120px] p-3 border border-gray-300 rounded-b-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
          aria-label="マークダウンエディター"
        />
        
        <div className="flex justify-between items-center mt-2">
          <div className={`text-sm ${isNearLimit ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
            残り {remainingChars} 文字
          </div>
          
          <button
            onClick={copyToClipboard}
            disabled={!text}
            className={`
              flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 shadow-sm
              ${isCopied 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : text 
                  ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
            aria-label="テキストをコピー"
            title={text ? "テキストをコピー" : "コピーするテキストがありません"}
          >
            {isCopied ? (
              <>
                <Check size={16} className="animate-pulse" />
                <span className="text-xs font-medium">コピー完了</span>
              </>
            ) : (
              <>
                <ClipboardCopy size={16} />
                <span className="text-xs font-medium">コピー</span>
              </>
            )}
          </button>
        </div>
      </div>

      {text && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">プレビュー:</h4>
          <div className="p-3 bg-white border border-gray-200 rounded-md prose prose-sm max-w-none overflow-auto">
            <ReactMarkdown components={components}>
              {text}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* マークダウンヘルプモーダル */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">マークダウン記法の基本</h3>
              <button
                onClick={toggleHelp}
                className="text-gray-500 hover:text-gray-700"
                aria-label="閉じる"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="prose prose-sm">
                <h4 className="text-md font-medium mb-2">基本構文</h4>
                <pre className="bg-gray-50 p-3 rounded text-sm font-mono whitespace-pre-wrap overflow-auto">
                  {markdownHelpText}
                </pre>
              </div>
              <div className="prose prose-sm">
                <h4 className="text-md font-medium mb-2">プレビュー</h4>
                <div className="bg-gray-50 p-3 rounded overflow-auto">
                  <ReactMarkdown components={components}>
                    {markdownHelpText}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={toggleHelp}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 