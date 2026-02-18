import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, FileText } from 'lucide-react'

export default function DocumentUploadStep({ data = {}, onChange }) {
  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange?.({ ...data, [field]: file })
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Document Upload</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Upload Identity Proof</h3>
          <label className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-slate-400" />
              <p className="text-sm text-slate-600">Click to upload ID (Passport, License, or Aadhar)</p>
            </div>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange('identityProof', e)}
              className="hidden"
            />
          </label>
          {data.identityProof && (
            <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
              <FileText className="w-4 h-4" />
              {data.identityProof.name}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-4">Upload Address Proof</h3>
          <label className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-slate-400" />
              <p className="text-sm text-slate-600">Click to upload address proof (Utility bill, Lease, etc)</p>
            </div>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange('addressProof', e)}
              className="hidden"
            />
          </label>
          {data.addressProof && (
            <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
              <FileText className="w-4 h-4" />
              {data.addressProof.name}
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-4">Upload Income Proof</h3>
          <label className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-slate-400" />
              <p className="text-sm text-slate-600">Click to upload income proof (Payslip, ITR, Bank Statement)</p>
            </div>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange('incomeProof', e)}
              className="hidden"
            />
          </label>
          {data.incomeProof && (
            <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
              <FileText className="w-4 h-4" />
              {data.incomeProof.name}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
