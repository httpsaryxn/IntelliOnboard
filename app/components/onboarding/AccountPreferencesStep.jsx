import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'

export default function AccountPreferencesStep({ data = {}, onNext, onBack, loading }) {
  const [localData, setLocalData] = useState({
    accountType: 'savings',
    currency: 'USD',
    ...data
  })

  const accountTypes = [
    { id: 'savings', name: 'Savings Account', desc: 'Standard high-interest account' },
    { id: 'checking', name: 'Checking Account', desc: 'Perfect for daily spending' },
    { id: 'investment', name: 'Investment Account', desc: 'Wealth management features' }
  ]

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label className="text-slate-500 uppercase text-xs font-bold tracking-widest">Account Type</Label>
        <div className="grid gap-3">
          {accountTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setLocalData({ ...localData, accountType: type.id })}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                localData.accountType === type.id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div>
                <p className="font-bold text-slate-900">{type.name}</p>
                <p className="text-xs text-slate-500">{type.desc}</p>
              </div>
              {localData.accountType === type.id && <Check className="w-5 h-5 text-primary" />}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="currency">Currency</Label>
        <select
          id="currency"
          value={localData.currency}
          onChange={(e) => setLocalData({ ...localData, currency: e.target.value })}
          className="w-full h-12 px-4 rounded-xl border-2 border-slate-100 outline-none focus:border-primary"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>

      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12 rounded-xl">Back</Button>
        <Button onClick={() => onNext(localData)} className="flex-[2] h-12 rounded-xl font-semibold" disabled={loading}>
          {loading ? 'Saving...' : 'Review Application'}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}