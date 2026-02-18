import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function PersonalDetailsStep({ data = {}, onNext, loading }) {
  const [localData, setLocalData] = useState(data)

  const handleChange = (field, value) => {
    setLocalData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext?.(localData)
  }

  const isFormValid = localData.firstName && localData.lastName && localData.email && localData.phone

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            value={localData.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={localData.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={localData.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={localData.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input
          id="dob"
          type="date"
          value={localData.dob || ''}
          onChange={(e) => handleChange('dob', e.target.value)}
          required
        />
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          className="w-full h-12 rounded-xl text-base font-semibold"
          disabled={!isFormValid || loading}
        >
          {loading ? 'Saving...' : 'Continue to Address'}
          {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
        </Button>
      </div>
    </form>
  )
}