import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

export default function AddressEmploymentStep({ data = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange?.({ ...data, [field]: value })
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Address & Employment</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Residential Address</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                placeholder="123 Main Street"
                value={data.street || ''}
                onChange={(e) => handleChange('street', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={data.city || ''}
                  onChange={(e) => handleChange('city', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  value={data.state || ''}
                  onChange={(e) => handleChange('state', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipcode">ZIP Code</Label>
                <Input
                  id="zipcode"
                  placeholder="10001"
                  value={data.zipcode || ''}
                  onChange={(e) => handleChange('zipcode', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="United States"
                  value={data.country || ''}
                  onChange={(e) => handleChange('country', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Employment Information</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Your Company"
                value={data.company || ''}
                onChange={(e) => handleChange('company', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                placeholder="Job Title"
                value={data.designation || ''}
                onChange={(e) => handleChange('designation', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="Technology"
                value={data.industry || ''}
                onChange={(e) => handleChange('industry', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
