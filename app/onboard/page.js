'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, Check, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PersonalDetailsStep from '@/components/onboarding/PersonalDetailsStep'
import AddressEmploymentStep from '@/components/onboarding/AddressEmploymentStep'
import DocumentUploadStep from '@/components/onboarding/DocumentUploadStep'
import KYCVerificationStep from '@/components/onboarding/KYCVerificationStep'
import AccountPreferencesStep from '@/components/onboarding/AccountPreferencesStep'
import ReviewConfirmStep from '@/components/onboarding/ReviewConfirmStep'

const steps = [
  { id: 1, title: 'Personal Details', description: 'Basic information' },
  { id: 2, title: 'Address & Employment', description: 'Where you live and work' },
  { id: 3, title: 'Document Upload', description: 'Verification documents' },
  { id: 4, title: 'Identity Verification', description: 'Quick verification' },
  { id: 5, title: 'Account Preferences', description: 'Customize your account' },
  { id: 6, title: 'Review & Confirm', description: 'Final review' }
]

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [initializing, setInitializing] = useState(true)
  const [applicationId, setApplicationId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail')
    const savedAppId = localStorage.getItem('applicationId')
    
    if (!savedEmail) {
      router.push('/login')
      return
    }

    if (savedAppId) {
      setApplicationId(savedAppId)
      loadApplication(savedAppId)
    } else {
      setInitializing(false)
    }
  }, [router])

  const loadApplication = async (appId) => {
    try {
      const response = await fetch(`/api/applications/${appId}`)
      if (response.ok) {
        const result = await response.json()
        setFormData(result.application.form_data || {})
        setCurrentStep(result.application.current_step || 1)
        
        // If already submitted, redirect to status
        if (result.application.status !== 'draft') {
          router.push('/status')
        }
      }
    } catch (err) {
      console.error('Failed to load application:', err)
    } finally {
      setInitializing(false)
    }
  }

  const handleNext = async (stepData) => {
    const updatedFormData = { ...formData, ...stepData }
    setFormData(updatedFormData)

    setLoading(true)
    try {
      const response = await fetch('/api/applications/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          email: localStorage.getItem('userEmail'),
          currentStep,
          data: updatedFormData
        })
      })

      const result = await response.json()
      if (result.applicationId && !applicationId) {
        setApplicationId(result.applicationId)
        localStorage.setItem('applicationId', result.applicationId)
      }

      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } catch (err) {
      console.error('Save error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          data: formData
        })
      })

      if (response.ok) {
        router.push('/status')
      } else {
        throw new Error('Submission failed')
      }
    } catch (err) {
      console.error('Submit error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-slate-50/50">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">IB</span>
            </div>
            <span className="text-xl font-bold text-primary">IntelliOnboard</span>
          </div>
          <div className="flex items-center gap-4">
             {currentStep > 1 && (
               <Button variant="ghost" size="sm" onClick={handleBack} disabled={loading}>
                 <ChevronLeft className="w-4 h-4 mr-1" /> Back
               </Button>
             )}
             <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
               Step {currentStep} of {steps.length}
             </span>
          </div>
        </div>
        <Progress value={progress} className="h-1 rounded-none bg-slate-100" />
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 space-y-1">
            <h1 className="text-2xl font-bold text-slate-900">{steps[currentStep - 1].title}</h1>
            <p className="text-slate-500">{steps[currentStep - 1].description}</p>
          </div>

          <div className="relative">
            {loading && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-2xl">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            )}
            
            {currentStep === 1 && <PersonalDetailsStep data={formData} onNext={handleNext} />}
            {currentStep === 2 && <AddressEmploymentStep data={formData} onNext={handleNext} />}
            {currentStep === 3 && <DocumentUploadStep data={formData} onNext={handleNext} />}
            {currentStep === 4 && <KYCVerificationStep data={formData} onNext={handleNext} />}
            {currentStep === 5 && <AccountPreferencesStep data={formData} onNext={handleNext} />}
            {currentStep === 6 && <ReviewConfirmStep data={formData} onSubmit={handleSubmit} />}
          </div>

          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              {steps.map((s) => (
                <div 
                  key={s.id} 
                  className={`h-1.5 w-8 rounded-full transition-all duration-500 ${
                    s.id === currentStep ? 'bg-primary w-12' : 
                    s.id < currentStep ? 'bg-accent' : 'bg-slate-200'
                  }`} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}