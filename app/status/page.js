'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Clock, Mail, Phone, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function StatusPage() {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadStatus = async () => {
      const email = localStorage.getItem('userEmail')
      const appId = localStorage.getItem('applicationId')
      
      if (!email || !appId) {
        router.push('/login')
        return
      }

      try {
        const response = await fetch(`/api/applications/${appId}`)
        if (response.ok) {
          const data = await response.json()
          setApplication(data.application)
        }
      } catch (err) {
        console.error('Failed to load application:', err)
      } finally {
        setLoading(false)
      }
    }

    loadStatus()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    )
  }

  const getStatusSteps = () => {
    const status = application?.status || 'submitted'
    return [
      { id: 1, title: 'Application Received', done: true, current: false },
      { id: 2, title: 'Risk Assessment', done: status !== 'submitted', current: status === 'submitted' },
      { id: 3, title: 'Manual Review', done: ['approved', 'rejected'].includes(status), current: status === 'reviewing' },
      { id: 4, title: 'Account Setup', done: status === 'approved', current: status === 'reviewing' && application?.risk_level === 'low' }
    ]
  }

  const timeline = getStatusSteps()

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">IB</span>
            </div>
            <span className="text-xl font-bold text-primary">IntelliOnboard</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck className="w-4 h-4 text-accent" />
            Verified Secure Session
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-3xl p-8 border shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-100 rounded-2xl">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Application Submitted</h1>
                  <p className="text-slate-500 text-sm">Ref: {application?.id?.slice(0,8).toUpperCase()}</p>
                </div>
              </div>

              <div className="space-y-8 mt-10">
                {timeline.map((step, idx) => (
                  <div key={step.id} className="flex gap-4 relative">
                    {idx !== timeline.length - 1 && (
                      <div className={`absolute left-[19px] top-10 w-0.5 h-10 ${step.done ? 'bg-green-500' : 'bg-slate-200'}`} />
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 shrink-0 ${
                      step.done ? 'bg-green-500 text-white' : 
                      step.current ? 'bg-primary text-white animate-pulse' : 
                      'bg-slate-100 text-slate-400'
                    }`}>
                      {step.done ? <CheckCircle2 className="w-6 h-6" /> : <span className="text-sm font-bold">{step.id}</span>}
                    </div>
                    <div className="pt-2">
                      <h3 className={`font-semibold ${step.done ? 'text-slate-900' : 'text-slate-500'}`}>{step.title}</h3>
                      <p className="text-sm text-slate-400">
                        {step.done ? 'Completed' : step.current ? 'Under technical review' : 'Waiting for previous steps'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-900 rounded-3xl p-8 text-white">
              <h2 className="text-lg font-semibold mb-4">Estimated Processing Time</h2>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span className="text-2xl font-bold">24-48h</span>
                </div>
                <div className="h-10 w-px bg-slate-700" />
                <p className="text-slate-400 text-sm">
                  Your application is currently at the <strong>Risk Assessment</strong> stage. We'll notify you via SMS once finished.
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <Card className="p-6 border bg-white shadow-sm rounded-3xl">
              <h3 className="font-bold text-slate-900 mb-4">Your Selection</h3>
              <div className="space-y-4">
                <div className="pb-4 border-b last:border-0">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Account Type</p>
                  <p className="text-sm font-medium capitalize">{application?.form_data?.accountType || 'Savings'}</p>
                </div>
                <div className="pb-4 border-b last:border-0">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Preferred Currency</p>
                  <p className="text-sm font-medium">{application?.form_data?.currency || 'USD'}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border bg-white shadow-sm rounded-3xl">
              <h3 className="font-bold text-slate-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Email Support</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Call Support</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  )
}