'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
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
  const [applicationId, setApplicationId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    // Load saved application
    const savedEmail = localStorage.getItem('userEmail')
    const savedAppId = localStorage.getItem('applicationId')
    
    if (!savedEmail) {
      router.push('/login')
      return
    }

    if (savedAppId) {
      setApplicationId(savedAppId)
      loadApplication(savedAppId)
    }
  }, [])

  const loadApplication = async (appId) => {
    try {
      const response = await fetch(`/api/applications/${appId}`)
      if (response.ok) {
        const data = await response.json()
        setFormData(data.application)
        setCurrentStep(data.application.current_step || 1)
      }
    } catch (err) {
      console.error('Failed to load application:', err)
    }
  }

  const handleNext = async (stepData) => {
    const updatedData = { ...formData, ...stepData }
    setFormData(updatedData)

    // Save progress
    setLoading(true)
    try {
      const response = await fetch('/api/applications/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          email: localStorage.getItem('userEmail'),
          currentStep,
          data: stepData
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
      console.error('Failed to save progress:', err)
      alert('Failed to save progress. Please try again.')
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

  const handleSubmit = async (finalData) => {
    const completeData = { ...formData, ...finalData }
    setLoading(true)
    
    try {
      const response = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId,
          email: localStorage.getItem('userEmail'),
          data: completeData
        })
      })

      if (response.ok) {
        router.push('/status')
      } else {
        throw new Error('Failed to submit application')
      }
    } catch (err) {
      alert('Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[hsl(217,33%,17%)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IB</span>
              </div>
              <span className="text-xl font-semibold text-[hsl(217,33%,17%)]">IntelliOnboard</span>
            </div>
            <div className="text-sm text-slate-600">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[hsl(217,33%,17%)]">{Math.round(progress)}% Complete</span>
              <span className="text-slate-500">You're almost done!</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="mt-6 hidden md:flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                    step.id < currentStep ? 'bg-green-100 text-green-600' :
                    step.id === currentStep ? 'bg-[hsl(217,33%,17%)] text-white' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-xs font-medium ${
                      step.id === currentStep ? 'text-[hsl(217,33%,17%)]' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step.id < currentStep ? 'bg-green-200' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 border-slate-200 rounded-2xl shadow-sm">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[hsl(217,33%,17%)] mb-2">
                {steps[currentStep - 1].title}
              </h1>
              <p className="text-slate-600">{steps[currentStep - 1].description}</p>
            </div>

            {currentStep === 1 && (
              <PersonalDetailsStep 
                data={formData} 
                onNext={handleNext} 
                loading={loading}
              />
            )}
            {currentStep === 2 && (
              <AddressEmploymentStep 
                data={formData} 
                onNext={handleNext} 
                onBack={handleBack}
                loading={loading}
              />
            )}
            {currentStep === 3 && (
              <DocumentUploadStep 
                data={formData} 
                onNext={handleNext} 
                onBack={handleBack}
                loading={loading}
                applicationId={applicationId}
              />
            )}
            {currentStep === 4 && (
              <KYCVerificationStep 
                data={formData} 
                onNext={handleNext} 
                onBack={handleBack}
                loading={loading}
              />
            )}
            {currentStep === 5 && (
              <AccountPreferencesStep 
                data={formData} 
                onNext={handleNext} 
                onBack={handleBack}
                loading={loading}
              />
            )}
            {currentStep === 6 && (
              <ReviewConfirmStep 
                data={formData} 
                onSubmit={handleSubmit} 
                onBack={handleBack}
                loading={loading}
              />
            )}
          </Card>

          {/* Help Text */}
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>Your progress is automatically saved. You can return anytime.</p>
          </div>
        </div>
      </div>
    </div>
  )
}