import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

export default function PersonalDetailsStep({ data = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange?.({ ...data, [field]: value })
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Personal Details</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={data.firstName || ''}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={data.lastName || ''}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            value={data.dob || ''}
            onChange={(e) => handleChange('dob', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pan">PAN (Tax ID)</Label>
          <Input
            id="pan"
            placeholder="AAAPA1234A"
            value={data.pan || ''}
            onChange={(e) => handleChange('pan', e.target.value)}
          />
        </div>
      </div>
    </Card>
  )
}
