import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ThemeSettingsCard } from '@/components/theme-settings-card';

export const metadata: Metadata = {
  title: 'Settings | GrowZenia Admin Dashboard',
  description: 'Application settings and preferences'
};

export default function SettingsPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">
              Manage your application preferences
            </p>
          </div>
        </div>

        {/* Theme Settings */}
        <ThemeSettingsCard />

     
      </div>
    </PageContainer>
  );
}