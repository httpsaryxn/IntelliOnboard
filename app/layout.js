import './globals.css'
import AIAssistant from '@/components/AIAssistant'
import { Toaster } from '@/components/ui/toaster'

export const metadata = {
  title: 'IntelliOnboard - Smart Bank Account Opening',
  description: 'Open your bank account in minutes. Secure, paperless, and hassle-free digital banking.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body>
        {children}
        <AIAssistant />
        <Toaster />
      </body>
    </html>
  )
}