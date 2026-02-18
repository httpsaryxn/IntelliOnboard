import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Camera, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function KYCVerificationStep({ data = {}, onChange }) {
  const [verified, setVerified] = useState(data.verified || false)
  const [cameraActive, setCameraActive] = useState(false)

  const handleVerify = () => {
    setVerified(true)
    onChange?.({ ...data, verified: true })
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Identity Verification</h2>
      <div className="space-y-6">
        {verified ? (
          <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-900">Verification Complete</h3>
            <p className="text-sm text-green-700 mt-2">Your identity has been successfully verified</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                We'll need to verify your identity using your webcam. Make sure you're in a well-lit area with a clear background.
              </p>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              {cameraActive ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-full bg-slate-200 rounded-lg aspect-video flex items-center justify-center">
                    <Camera className="w-12 h-12 text-slate-400" />
                  </div>
                  <Button onClick={() => handleVerify()} className="bg-green-600 hover:bg-green-700">
                    Verify Identity
                  </Button>
                  <button
                    onClick={() => setCameraActive(false)}
                    className="text-sm text-slate-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Camera className="w-12 h-12 text-slate-400" />
                  <p className="text-sm text-slate-600">Click below to start verification</p>
                  <Button onClick={() => setCameraActive(true)} className="bg-blue-600 hover:bg-blue-700">
                    Start Verification
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
