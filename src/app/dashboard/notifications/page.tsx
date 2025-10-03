import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Send, Bell, Smartphone, Mail } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const metadata: Metadata = {
  title: 'Notifications | Digital Gold Admin',
  description: 'Manage push notifications, SMS, and email communications.'
};

export default function NotificationsPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Notification Center</h1>
            <p className="text-muted-foreground">
              Send push notifications, SMS, and email communications to users
            </p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>

        {/* Send New Notification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send New Notification
            </CardTitle>
            <CardDescription>
              Create and send instant notifications to your users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="notification-type">Notification Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="push">Push Notification</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="all">All Types</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active Users</SelectItem>
                    <SelectItem value="sip">SIP Users</SelectItem>
                    <SelectItem value="kyc-pending">KYC Pending</SelectItem>
                    <SelectItem value="high-value">High Value Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notification-title">Title</Label>
              <Input
                id="notification-title"
                placeholder="Enter notification title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notification-message">Message</Label>
              <Textarea
                id="notification-message"
                placeholder="Enter your message here..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-2">
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Send Now
              </Button>
              <Button variant="outline">Schedule Later</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Templates</CardTitle>
            <CardDescription>
              Pre-configured templates for common notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <CardTitle className="text-sm">SIP Reminder</CardTitle>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Push</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    Daily SIP investment reminder for users
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <CardTitle className="text-sm">KYC Approval</CardTitle>
                    </div>
                    <Badge className="bg-green-100 text-green-800">SMS</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    KYC verification status update message
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <CardTitle className="text-sm">Lucky Draw Winner</CardTitle>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Email</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    Congratulations message for draw winners
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4" />
                      <CardTitle className="text-sm">Gold Price Alert</CardTitle>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Push</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    Gold price movement notifications
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      <CardTitle className="text-sm">Withdrawal Update</CardTitle>
                    </div>
                    <Badge className="bg-green-100 text-green-800">SMS</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    Withdrawal request status notifications
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <CardTitle className="text-sm">Monthly Report</CardTitle>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Email</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    Monthly investment summary for users
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              History of sent notifications and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Daily SIP Reminder",
                  type: "Push",
                  sent: "2,456",
                  delivered: "2,398",
                  time: "2 hours ago",
                  status: "Delivered"
                },
                {
                  title: "Gold Price Alert",
                  type: "SMS",
                  sent: "12,847",
                  delivered: "12,589",
                  time: "5 hours ago",
                  status: "Delivered"
                },
                {
                  title: "KYC Pending Reminder",
                  type: "Email",
                  sent: "456",
                  delivered: "432",
                  time: "1 day ago",
                  status: "Delivered"
                }
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {notification.type === 'Push' && <Bell className="h-5 w-5 text-blue-500" />}
                      {notification.type === 'SMS' && <Smartphone className="h-5 w-5 text-green-500" />}
                      {notification.type === 'Email' && <Mail className="h-5 w-5 text-purple-500" />}
                    </div>
                    <div>
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {notification.type} • {notification.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {notification.delivered} / {notification.sent} delivered
                    </div>
                    <Badge className="bg-green-100 text-green-800 mt-1">
                      {notification.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}