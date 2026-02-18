'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">AI Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-slate-600">
            How can I help you with your application today?
          </div>
        </div>
      )}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-14 h-14 flex items-center justify-center"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  )
}
