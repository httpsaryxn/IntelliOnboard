import { Button } from '@/components/ui/button'
import { Camera, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function KYCVerificationStep({ data = {}, onNext, onBack, loading }) {
  const [verified, setVerified] = useState(data.verified || false)
  const [cameraActive, setCameraActive] = useState(false)

  const handleVerify = () => {
    setVerified(true)
    // In a real app, this would involve facial recognition logic
  }

  return (
    <div className="space-y-6">
      {verified ? (
        <div className="flex flex-col items-center justify-center p-12 bg-accent/5 rounded-3xl border-2 border-accent/20 border-dashed">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Identity Verified</h3>
          <p className="text-slate-500 text-center mt-2">Biometric data has been captured and validated.</p>
        </div>
      ) : (
        <div className="border-2 border-slate-100 rounded-3xl overflow-hidden bg-slate-50">
          {cameraActive ? (
            <div className="p-6 text-center space-y-4">
              <div className="aspect-video bg-black rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 border-[3px] border-accent/30 rounded-full scale-75 border-dashed animate-pulse" />
                <Camera className="w-12 h-12 text-white/20" />
              </div>
              <Button onClick={handleVerify} className="w-full bg-accent hover:bg-accent/90 h-12">Capture & Verify</Button>
            </div>
          ) : (
            <div className="p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">Webcam Verification</h3>
                <p className="text-sm text-slate-500">We need a quick live photo to match against your uploaded documents.</p>
              </div>
              <Button onClick={() => setCameraActive(true)} variant="outline" className="h-12 px-8">Start Camera</Button>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12 rounded-xl">Back</Button>
        <Button 
          onClick={() => onNext({ ...data, verified: true })} 
          className="flex-[2] h-12 rounded-xl" 
          disabled={!verified || loading}
        >
          {loading ? 'Saving...' : 'Account Preferences'}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}