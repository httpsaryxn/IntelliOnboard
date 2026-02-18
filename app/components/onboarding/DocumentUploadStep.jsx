import { Button } from '@/components/ui/button'
import { Upload, FileText, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function DocumentUploadStep({ data = {}, onNext, onBack, loading }) {
  const [localData, setLocalData] = useState(data)

  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0]
    if (file) {
      setLocalData(prev => ({ ...prev, [field]: { name: file.name, size: file.size } }))
    }
  }

  const isReady = localData.identityProof && localData.addressProof

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {['identityProof', 'addressProof'].map((field) => (
          <div key={field} className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wider text-slate-500">
              {field === 'identityProof' ? 'Identity Proof' : 'Address Proof'}
            </h3>
            <label className={`block border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              localData[field] ? 'border-accent bg-accent/5' : 'border-slate-200 hover:border-primary'
            }`}>
              <div className="flex flex-col items-center gap-2">
                {localData[field] ? (
                  <>
                    <CheckCircle2 className="w-8 h-8 text-accent" />
                    <p className="text-sm font-medium text-slate-900">{localData[field].name}</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-slate-400" />
                    <p className="text-sm text-slate-600">Click to upload document</p>
                    <p className="text-xs text-slate-400">PDF, JPG or PNG (max 5MB)</p>
                  </>
                )}
              </div>
              <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileChange(field, e)} className="hidden" />
            </label>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-6">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12 rounded-xl">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button onClick={() => onNext(localData)} className="flex-[2] h-12 rounded-xl" disabled={!isReady || loading}>
          Continue to Verification
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}