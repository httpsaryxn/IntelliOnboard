'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle2, Clock, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const statusSteps = [
  { id: 1, title: 'Application Submitted', description: 'We received your application', status: 'completed' },
  { id: 2, title: 'Document Verification', description: 'Verifying your documents', status: 'current' },
  { id: 3, title: 'Background Check', description: 'Conducting security checks', status: 'pending' },
  { id: 4, title: 'Final Review', description: 'Final approval process', status: 'pending' },
  { id: 5, title: 'Account Activation', description: 'Your account is being set up', status: 'pending' }
]

export default function StatusPage() {
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadApplication = async () => {
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

    loadApplication()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-[hsl(217,33%,17%)] rounded-full animate-spin mx-auto" />
          <p className="text-slate-600">Loading your application status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[hsl(217,33%,17%)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">IB</span>
            </div>
            <span className="text-xl font-semibold text-[hsl(217,33%,17%)]">IntelliOnboard</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Success Message */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[hsl(217,33%,17%)] mb-2">
                Application Submitted Successfully!
              </h1>
              <p className="text-slate-600 text-lg">
                Thank you for applying. We're reviewing your application.
              </p>
            </div>
          </div>

          {/* Application Info */}
          <Card className="p-6 border-slate-200 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600 mb-1">Application ID</p>
                <p className="font-mono text-sm font-semibold text-[hsl(217,33%,17%)]">
                  {application?.id || 'APP-XXXX-XXXX'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Submitted On</p>
                <p className="font-semibold text-[hsl(217,33%,17%)]">
                  {application?.submitted_at ? new Date(application.submitted_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'Just now'}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Account Type</p>
                <p className="font-semibold text-[hsl(217,33%,17%)] capitalize">
                  {application?.account_type || 'Savings'} Account
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-1">Estimated Processing</p>
                <p className="font-semibold text-[hsl(217,33%,17%)]">24-48 hours</p>
              </div>
            </div>
          </Card>

          {/* Status Timeline */}
          <Card className="p-8 border-slate-200 rounded-2xl">
            <h2 className="text-xl font-bold text-[hsl(217,33%,17%)] mb-6">Application Progress</h2>
            <div className="space-y-6">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === 'completed' ? 'bg-green-100' :
                      step.status === 'current' ? 'bg-blue-100' :
                      'bg-slate-100'
                    }`}>
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : step.status === 'current' ? (
                        <Clock className="w-5 h-5 text-blue-600" />
                      ) : (
                        <div className="w-2 h-2 bg-slate-300 rounded-full" />
                      )}
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div className={`w-0.5 h-12 ${
                        step.status === 'completed' ? 'bg-green-200' : 'bg-slate-200'
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className={`font-semibold mb-1 ${
                      step.status === 'completed' ? 'text-green-900' :
                      step.status === 'current' ? 'text-blue-900' :
                      'text-slate-500'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                    {step.status === 'current' && (
                      <p className="text-xs text-blue-600 mt-2 font-medium">In Progress...</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* What Happens Next */}
          <Card className="p-6 border-slate-200 rounded-2xl bg-slate-50">
            <h3 className="font-semibold text-[hsl(217,33%,17%)] mb-4">What Happens Next?</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="text-[hsl(180,25%,50%)] font-bold mt-0.5">•</span>
                <span>We're reviewing your application and verifying your documents</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[hsl(180,25%,50%)] font-bold mt-0.5">•</span>
                <span>You'll receive an email/SMS update at each stage of the process</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[hsl(180,25%,50%)] font-bold mt-0.5">•</span>
                <span>Most applications are approved within 24-48 hours</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-[hsl(180,25%,50%)] font-bold mt-0.5">•</span>
                <span>Once approved, your account will be activated immediately</span>
              </li>
            </ul>
          </Card>

          {/* Contact Support */}
          <Card className="p-6 border-slate-200 rounded-2xl">
            <h3 className="font-semibold text-[hsl(217,33%,17%)] mb-4">Need Help?</h3>
            <p className="text-sm text-slate-600 mb-4">
              Our support team is here to help you with any questions about your application.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="rounded-xl flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@intellionboard.com
              </Button>
              <Button variant="outline" className="rounded-xl flex items-center gap-2">
                <Phone className="w-4 h-4" />
                1-800-BANK-NOW
              </Button>
            </div>
          </Card>

          {/* Return Home */}
          <div className="text-center">
            <Link href="/">
              <Button variant="outline" className="rounded-xl">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}