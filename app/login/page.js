'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [step, setStep] = useState('email') // email, otp, verify
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
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP')
      }
      
      setStep('otp')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setError('')
    
    if (otp.length !== 6) {
      setError('Please enter the complete 6-digit OTP')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP')
      }
      
      // Store session
      localStorage.setItem('userEmail', email)
      localStorage.setItem('applicationId', data.applicationId)
      
      // Redirect to onboarding or status page
      if (data.status === 'submitted') {
        router.push('/status')
      } else {
        router.push('/onboard')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-[hsl(217,33%,17%)] rounded-xl flex items-center justify-center">
            <span className="text-white font-bold">IB</span>
          </div>
          <span className="text-2xl font-semibold text-[hsl(217,33%,17%)]">IntelliOnboard</span>
        </Link>

        <Card className="p-8 border-slate-200 rounded-2xl shadow-lg">
          {step === 'email' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-[hsl(217,33%,17%)]">Welcome Back</h1>
                <p className="text-slate-600">Enter your details to continue or start a new application</p>
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
                    className="rounded-xl"
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
                    className="rounded-xl"
                    required
                  />
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-[hsl(217,33%,17%)] hover:bg-[hsl(217,33%,25%)] rounded-xl py-6"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Link href="/" className="text-sm text-[hsl(180,25%,50%)] hover:underline inline-flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" />
                  Back to home
                </Link>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-[hsl(217,33%,17%)]">Verify Your Identity</h1>
                <p className="text-slate-600">Enter the 6-digit code sent to {email}</p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={6} 
                    value={otp} 
                    onChange={setOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-12 h-12 text-lg rounded-xl" />
                      <InputOTPSlot index={1} className="w-12 h-12 text-lg rounded-xl" />
                      <InputOTPSlot index={2} className="w-12 h-12 text-lg rounded-xl" />
                      <InputOTPSlot index={3} className="w-12 h-12 text-lg rounded-xl" />
                      <InputOTPSlot index={4} className="w-12 h-12 text-lg rounded-xl" />
                      <InputOTPSlot index={5} className="w-12 h-12 text-lg rounded-xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {error && (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-xl text-center">
                    {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-[hsl(217,33%,17%)] hover:bg-[hsl(217,33%,25%)] rounded-xl py-6"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify & Continue'
                  )}
                </Button>
              </form>

              <div className="text-center space-y-2">
                <button 
                  onClick={() => handleSendOTP({ preventDefault: () => {} })}
                  className="text-sm text-[hsl(180,25%,50%)] hover:underline"
                  disabled={loading}
                >
                  Resend code
                </button>
                <div>
                  <button 
                    onClick={() => setStep('email')}
                    className="text-sm text-slate-600 hover:underline inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change email or phone
                  </button>
                </div>
              </div>
            </div>
          )}
        </Card>

        <p className="text-center text-sm text-slate-500 mt-6">
          Your information is encrypted and secure
        </p>
      </div>
    </div>
  )
}