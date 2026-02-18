import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export default function ReviewConfirmStep({ data = {}, onSubmit }) {
  const handleSubmit = () => {
    onSubmit?.()
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Review & Confirm</h2>
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-900">
            Please review all the information you've provided. Once submitted, you may not be able to edit some fields.
          </p>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Personal Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Name</p>
                <p className="font-medium">{data.firstName} {data.lastName}</p>
              </div>
              <div>
                <p className="text-slate-600">Email</p>
                <p className="font-medium">{data.email}</p>
              </div>
              <div>
                <p className="text-slate-600">Phone</p>
                <p className="font-medium">{data.phone}</p>
              </div>
              <div>
                <p className="text-slate-600">Date of Birth</p>
                <p className="font-medium">{data.dob}</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Address & Employment</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Address</p>
                <p className="font-medium">{data.street}, {data.city}</p>
              </div>
              <div>
                <p className="text-slate-600">Company</p>
                <p className="font-medium">{data.company}</p>
              </div>
              <div>
                <p className="text-slate-600">Designation</p>
                <p className="font-medium">{data.designation}</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-3">Account Preferences</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Account Type</p>
                <p className="font-medium capitalize">{data.accountType}</p>
              </div>
              <div>
                <p className="text-slate-600">Currency</p>
                <p className="font-medium">{data.currency}</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-sm">
                <span className="font-semibold">Document Upload:</span> Complete
              </p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-sm">
                <span className="font-semibold">Identity Verification:</span> Complete
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSubmit} className="flex-1 bg-green-600 hover:bg-green-700 h-11">
            Submit Application
          </Button>
        </div>

        <p className="text-xs text-slate-600 text-center">
          By clicking Submit, you agree to our terms and conditions
        </p>
      </div>
    </Card>
  )
}
