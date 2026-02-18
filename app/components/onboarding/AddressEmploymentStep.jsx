import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function AddressEmploymentStep({ data = {}, onNext, onBack, loading }) {
  const [localData, setLocalData] = useState(data)

  const handleChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext?.(localData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Residential Address</h3>
        <div className="space-y-2">
          <Label htmlFor="street">Street Address</Label>
          <Input
            id="street"
            placeholder="123 Main Street"
            value={localData.street || ''}
            onChange={(e) => handleChange('street', e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" value={localData.city || ''} onChange={(e) => handleChange('city', e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipcode">ZIP Code</Label>
            <Input id="zipcode" value={localData.zipcode || ''} onChange={(e) => handleChange('zipcode', e.target.value)} required />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-slate-900">Employment</h3>
        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input id="company" value={localData.company || ''} onChange={(e) => handleChange('company', e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" placeholder="e.g. Finance" value={localData.industry || ''} onChange={(e) => handleChange('industry', e.target.value)} required />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1 h-12 rounded-xl">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back
        </Button>
        <Button type="submit" className="flex-[2] h-12 rounded-xl text-base font-semibold" disabled={loading}>
          {loading ? 'Saving...' : 'Continue to Documents'}
          {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
        </Button>
      </div>
    </form>
  )
}