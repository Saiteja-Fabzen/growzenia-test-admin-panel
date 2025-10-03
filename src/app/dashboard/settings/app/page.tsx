import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Save, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'App Configuration | Digital Gold Admin',
  description: 'Configure application settings, limits, and business rules.'
};

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Settings', link: '/dashboard/settings' },
  { title: 'App Configuration', link: '/dashboard/settings/app' }
];

export default function AppConfigurationPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-6">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">App Configuration</h1>
            <p className="text-muted-foreground">
              Manage application settings, business rules, and operational limits
            </p>
          </div>
          
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        {/* Transaction Limits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Transaction Limits
              <Badge variant="outline">Critical</Badge>
            </CardTitle>
            <CardDescription>
              Configure minimum and maximum transaction limits for gold purchases and withdrawals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-gold-purchase">Min Gold Purchase (₹)</Label>
                <Input
                  id="min-gold-purchase"
                  type="number"
                  placeholder="100"
                  defaultValue="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-gold-purchase">Max Gold Purchase (₹)</Label>
                <Input
                  id="max-gold-purchase"
                  type="number"
                  placeholder="200000"
                  defaultValue="200000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-withdrawal">Min Withdrawal (₹)</Label>
                <Input
                  id="min-withdrawal"
                  type="number"
                  placeholder="500"
                  defaultValue="500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-withdrawal">Max Withdrawal (₹)</Label>
                <Input
                  id="max-withdrawal"
                  type="number"
                  placeholder="100000"
                  defaultValue="100000"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SIP Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>SIP Configuration</CardTitle>
            <CardDescription>
              Configure SIP (Systematic Investment Plan) parameters and rewards
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-sip">Min Daily SIP (₹)</Label>
                <Input
                  id="min-sip"
                  type="number"
                  placeholder="10"
                  defaultValue="10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-sip">Max Daily SIP (₹)</Label>
                <Input
                  id="max-sip"
                  type="number"
                  placeholder="5000"
                  defaultValue="5000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sip-reward-percentage">SIP Reward Percentage (%)</Label>
                <Input
                  id="sip-reward-percentage"
                  type="number"
                  step="0.01"
                  placeholder="10.00"
                  defaultValue="10.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sip-processing-time">Processing Time</Label>
                <Input
                  id="sip-processing-time"
                  placeholder="09:00 AM"
                  defaultValue="09:00 AM"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lucky Draw Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Lucky Draw Settings</CardTitle>
            <CardDescription>
              Configure lucky draw schedules and prize distributions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bronze-prize">Bronze Category Prize (₹)</Label>
                <Input
                  id="bronze-prize"
                  type="number"
                  placeholder="1000"
                  defaultValue="1000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="silver-prize">Silver Category Prize (₹)</Label>
                <Input
                  id="silver-prize"
                  type="number"
                  placeholder="5000"
                  defaultValue="5000"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gold-prize">Gold Category Prize (₹)</Label>
                <Input
                  id="gold-prize"
                  type="number"
                  placeholder="10000"
                  defaultValue="10000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diamond-prize">Diamond Category Prize (₹)</Label>
                <Input
                  id="diamond-prize"
                  type="number"
                  placeholder="25000"
                  defaultValue="25000"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="auto-draw" defaultChecked />
              <Label htmlFor="auto-draw">Enable Automatic Draw Selection</Label>
            </div>
          </CardContent>
        </Card>

        {/* Business Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Business Rules</CardTitle>
            <CardDescription>
              Configure business logic and operational settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kyc-verification">KYC Verification</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="kyc-required" defaultChecked />
                  <Label htmlFor="kyc-required">Require KYC for transactions</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="withdrawal-limit">Daily Withdrawal Limit</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="daily-limit" defaultChecked />
                  <Label htmlFor="daily-limit">Enable daily withdrawal limits</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance-message">Maintenance Message</Label>
              <Textarea
                id="maintenance-message"
                placeholder="Enter maintenance message for users..."
                className="min-h-[80px]"
                defaultValue="System under maintenance. Please try again later."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="maintenance-mode" />
              <Label htmlFor="maintenance-mode" className="flex items-center gap-2">
                Enable Maintenance Mode
                <AlertCircle className="h-4 w-4 text-amber-500" />
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Commission Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Commission & Fees</CardTitle>
            <CardDescription>
              Configure commission rates and transaction fees
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gold-commission">Gold Purchase Commission (%)</Label>
                <Input
                  id="gold-commission"
                  type="number"
                  step="0.01"
                  placeholder="0.50"
                  defaultValue="0.50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="withdrawal-fee">Withdrawal Processing Fee (₹)</Label>
                <Input
                  id="withdrawal-fee"
                  type="number"
                  placeholder="10"
                  defaultValue="10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gst-rate">GST Rate (%)</Label>
              <Input
                id="gst-rate"
                type="number"
                step="0.01"
                placeholder="18.00"
                defaultValue="18.00"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}