import { Metadata } from 'next';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Get Help | GrowZenia Admin Dashboard',
  description: 'Learn about keyboard shortcuts and theme settings'
};

export default function GetHelpPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Get Help</h1>
            <p className="text-muted-foreground">
              Learn about keyboard shortcuts and application settings
            </p>
          </div>
        </div>

        <Tabs defaultValue="shortcuts" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="shortcuts">Keyboard Shortcuts</TabsTrigger>
            <TabsTrigger value="themes">Theme Settings</TabsTrigger>
          </TabsList>

          {/* Keyboard Shortcuts Tab */}
          <TabsContent value="shortcuts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Command Palette</CardTitle>
                <CardDescription>
                  Press Cmd+K (Mac) or Ctrl+K (Windows/Linux) to open the command palette
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Open Command Palette</span>
                  <div className="flex gap-1">
                    <Badge variant="secondary">⌘</Badge>
                    <Badge variant="secondary">K</Badge>
                    <span className="text-muted-foreground text-xs mx-2">or</span>
                    <Badge variant="secondary">Ctrl</Badge>
                    <Badge variant="secondary">K</Badge>
                  </div>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">
                  The command palette allows you to quickly navigate to any page, search, and execute actions without using the mouse.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Navigation Shortcuts</CardTitle>
                <CardDescription>
                  Quick keyboard shortcuts to navigate through the dashboard (via Command Palette)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Go to Dashboard</span>
                  <div className="flex gap-1">
                    <Badge variant="secondary">D</Badge>
                    <Badge variant="secondary">D</Badge>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Go to All Users</span>
                  <div className="flex gap-1">
                    <Badge variant="secondary">U</Badge>
                    <Badge variant="secondary">U</Badge>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm">Go to SIP Management</span>
                  <div className="flex gap-1">
                    <Badge variant="secondary">S</Badge>
                    <Badge variant="secondary">S</Badge>
                  </div>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">
                  Open the command palette first (⌘K or Ctrl+K), then type these shortcuts or search for the page name.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Theme Shortcuts</CardTitle>
                <CardDescription>
                  Shortcuts to control appearance (via Command Palette)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Toggle Theme (Light/Dark)</span>
                  <div className="flex gap-1">
                    <Badge variant="secondary">T</Badge>
                    <Badge variant="secondary">T</Badge>
                  </div>
                </div>
                <Separator />
                <p className="text-sm text-muted-foreground">
                  You can also search for &quot;Set Light Theme&quot; or &quot;Set Dark Theme&quot; in the command palette to directly switch to a specific theme.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How to Use Shortcuts</CardTitle>
                <CardDescription>
                  Understanding the shortcut system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Command Palette Shortcuts</h3>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>Press <Badge variant="outline" className="mx-1">⌘K</Badge> (Mac) or <Badge variant="outline" className="mx-1">Ctrl+K</Badge> (Windows/Linux)</li>
                    <li>Type the shortcut keys (e.g., &quot;dd&quot; for Dashboard)</li>
                    <li>Or search by typing the page name (e.g., &quot;users&quot;, &quot;dashboard&quot;)</li>
                    <li>Press Enter to navigate</li>
                  </ol>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold">Browser Shortcuts</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <Badge variant="outline">Ctrl/⌘ + R</Badge> - Refresh page</li>
                    <li>• <Badge variant="outline">Ctrl/⌘ + +</Badge> - Zoom in</li>
                    <li>• <Badge variant="outline">Ctrl/⌘ + -</Badge> - Zoom out</li>
                    <li>• <Badge variant="outline">F11</Badge> - Toggle fullscreen (Windows/Linux)</li>
                    <li>• <Badge variant="outline">⌃⌘F</Badge> - Toggle fullscreen (Mac)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Theme Settings Tab */}
          <TabsContent value="themes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Theme Customization</CardTitle>
                <CardDescription>
                  Learn how to customize your dashboard appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Changing Theme Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    You can switch between light and dark modes to suit your preference and reduce eye strain.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mt-2">
                    <li>1. Navigate to Settings page</li>
                    <li>2. Find the &quot;Theme Mode&quot; toggle under Appearance</li>
                    <li>3. Click to switch between Light, Dark, or System mode</li>
                    <li>4. The change applies instantly</li>
                  </ul>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold">Available Theme Modes</h3>
                  <div className="grid gap-3 mt-2">
                    <div className="flex items-start gap-3">
                      <Badge>Light</Badge>
                      <p className="text-sm text-muted-foreground">
                        Clean, bright interface ideal for well-lit environments
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge>Dark</Badge>
                      <p className="text-sm text-muted-foreground">
                        Easy on the eyes for low-light conditions and extended use
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge>System</Badge>
                      <p className="text-sm text-muted-foreground">
                        Automatically matches your operating system&apos;s theme preference
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color Themes</CardTitle>
                <CardDescription>
                  Choose from multiple color palettes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Selecting a Color Theme</h3>
                  <p className="text-sm text-muted-foreground">
                    The dashboard offers various color themes to personalize your experience.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mt-2">
                    <li>1. Go to Settings → Appearance</li>
                    <li>2. Find the &quot;Color Theme&quot; selector</li>
                    <li>3. Click on your preferred color theme</li>
                    <li>4. The entire dashboard will update with the new colors</li>
                  </ul>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold">Theme Persistence</h3>
                  <p className="text-sm text-muted-foreground">
                    Your theme preferences are automatically saved to your browser&apos;s local storage. They will persist across sessions and browser restarts.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  Making the dashboard work better for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">High Contrast</h3>
                  <p className="text-sm text-muted-foreground">
                    Dark mode provides better contrast for improved readability. Use browser zoom (Ctrl/⌘ + +/-) to adjust text size.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold">Keyboard Navigation</h3>
                  <p className="text-sm text-muted-foreground">
                    The dashboard is fully keyboard accessible. Use Tab to navigate between elements and Enter to activate buttons.
                  </p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="font-semibold">Screen Reader Support</h3>
                  <p className="text-sm text-muted-foreground">
                    The dashboard includes proper ARIA labels and semantic HTML for screen reader compatibility.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
