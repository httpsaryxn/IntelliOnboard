import { Button } from '@/components/ui/button'
import { CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react'

export default function ReviewConfirmStep({ data = {}, onSubmit, onBack, loading }) {
  return (
    <div className="space-y-8">
      <div className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-100 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</p>
            <p className="font-medium">{data.firstName} {data.lastName}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Account Type</p>
            <p className="font-medium capitalize">{data.accountType} Account</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Location</p>
            <p className="font-medium">{data.city}, {data.state || 'NY'}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Currency</p>
            <p className="font-medium">{data.currency}</p>
          </div>
        </div>

        <div className="pt-4 border-t space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-accent" /> Identity Documents Verified
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-accent" /> Biometric Data Captured
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl">
          <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
          <p className="text-xs text-slate-600">
            By submitting, you agree to our Terms of Service and Electronic Communications Disclosure.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" onClick={onBack} className="flex-1 h-12 rounded-xl" disabled={loading}>Back</Button>
          <Button onClick={onSubmit} className="flex-[2] h-12 rounded-xl font-bold bg-primary hover:bg-primary/90" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </div>
    </div>
  )
}