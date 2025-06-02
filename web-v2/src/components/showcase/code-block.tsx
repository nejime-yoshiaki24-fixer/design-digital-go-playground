'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative">
      <pre className="overflow-x-auto rounded-lg bg-[#1e1e1e] p-4 text-sm text-gray-100">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-[#2d2d2d] text-gray-100 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[#3d3d3d]"
      >
        {copied ? (
          <>
            <Check className="mr-1 h-4 w-4" />
            コピー済み
          </>
        ) : (
          <>
            <Copy className="mr-1 h-4 w-4" />
            コピー
          </>
        )}
      </Button>
    </div>
  )
}
