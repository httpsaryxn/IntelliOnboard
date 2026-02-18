'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { ArrowLeft, Loader2, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [step, setStep] = useState('email') // email, otp
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSendOTP = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!email || !phone) {
      setError('Please enter both email and phone number')
      return
    }

    setLoading(true)
    try {
      // We still call this to simulate the experience, 
      // but we don't strictly need the response for the bypass logic
      await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone })
      })
      
      setStep('otp')
    } catch (err) {
      // Even if API fails, we let the user proceed for demo purposes
      setStep('otp')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = (e) => {
    e.preventDefault()
    setError('')
    
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit code')
      return
    }

    setLoading(true)

    // Bypass actual verification for now
    // Simulate a brief delay for a realistic feel
    setTimeout(() => {
      // Store mock session data
      localStorage.setItem('userEmail', email)
      // Provide a mock application ID if none exists
      const existingAppId = localStorage.getItem('applicationId')
      if (!existingAppId) {
        localStorage.setItem('applicationId', `demo-app-${Math.random().toString(36).substr(2, 9)}`)
      }
      
      // Redirect to onboarding
      router.push('/onboard')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">IB</span>
          </div>
          <span className="text-2xl font-bold text-primary tracking-tight">IntelliOnboard</span>
        </Link>

        <Card className="p-8 border-slate-200 shadow-xl bg-white overflow-hidden relative">
          {step === 'email' ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-primary">Welcome Back</h1>
                <p className="text-slate-500 text-sm">Enter details to access your application</p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl text-center">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl py-7 text-lg font-bold shadow-lg shadow-primary/20 transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Continue'
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Link href="/" className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center justify-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Back to home
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-primary tracking-tight">Verify Identity</h1>
                <p className="text-slate-500 text-sm leading-relaxed">Enter the 6-digit code sent to <br/><strong>{email}</strong></p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-8">
                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={6} 
                    value={otp} 
                    onChange={setOtp}
                  />
                </div>

                <div className="text-center">
                   <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                     Demo Mode: Enter any code (e.g. 000000)
                   </p>
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl text-center">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl py-7 text-lg font-bold shadow-lg shadow-primary/20 transition-all"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Verify & Continue'
                    )}
                  </Button>
                  
                  <button 
                    type="button"
                    onClick={() => setStep('email')}
                    className="w-full text-sm text-slate-400 hover:text-primary transition-colors flex items-center justify-center gap-2 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change contact info
                  </button>
                </div>
              </form>
            </div>
          )}
        </Card>

        <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" /> 256-bit Secure Session
        </div>
      </div>
    </div>
  )
}