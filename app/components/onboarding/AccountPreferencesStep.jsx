import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

export default function AccountPreferencesStep({ data = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange?.({ ...data, [field]: value })
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Account Preferences</h2>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="accountType">Account Type</Label>
          <select
            id="accountType"
            value={data.accountType || ''}
            onChange={(e) => handleChange('accountType', e.target.value)}
            className="w-full h-11 px-4 rounded-lg border-2 border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all"
          >
            <option value="">Select Account Type</option>
            <option value="savings">Savings Account</option>
            <option value="checking">Checking Account</option>
            <option value="investment">Investment Account</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Preferred Currency</Label>
          <select
            id="currency"
            value={data.currency || 'USD'}
            onChange={(e) => handleChange('currency', e.target.value)}
            className="w-full h-11 px-4 rounded-lg border-2 border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Preferred Language</Label>
          <select
            id="language"
            value={data.language || 'en'}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full h-11 px-4 rounded-lg border-2 border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="font-semibold">Notifications</h3>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emailNotif"
              checked={data.emailNotifications !== false}
              onChange={(e) => handleChange('emailNotifications', e.target.checked)}
              className="w-4 h-4 rounded border-2 border-slate-300 cursor-pointer"
            />
            <Label htmlFor="emailNotif" className="ml-3 cursor-pointer">
              Email Notifications
            </Label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="smsNotif"
              checked={data.smsNotifications !== false}
              onChange={(e) => handleChange('smsNotifications', e.target.checked)}
              className="w-4 h-4 rounded border-2 border-slate-300 cursor-pointer"
            />
            <Label htmlFor="smsNotif" className="ml-3 cursor-pointer">
              SMS Notifications
            </Label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="marketingNotif"
              checked={data.marketingNotifications || false}
              onChange={(e) => handleChange('marketingNotifications', e.target.checked)}
              className="w-4 h-4 rounded border-2 border-slate-300 cursor-pointer"
            />
            <Label htmlFor="marketingNotif" className="ml-3 cursor-pointer">
              Marketing & Promotional Emails
            </Label>
          </div>
        </div>
      </div>
    </Card>
  )
}
