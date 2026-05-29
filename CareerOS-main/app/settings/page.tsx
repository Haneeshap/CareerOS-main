'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from 'next-themes';
import {
  User,
  Bell,
  Shield,
  Palette,
  Upload,
  Check,
  Sun,
  Moon,
  Monitor,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import { toast } from 'sonner';

const SKILL_SUGGESTIONS = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL', 'PostgreSQL', 'Kubernetes', 'Go'];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    fullName: 'Alex Johnson',
    email: 'alex@example.com',
    title: 'Senior Frontend Engineer',
    location: 'San Francisco, CA',
    phone: '+1 (415) 555-0123',
    bio: 'Passionate engineer with 4+ years of experience building scalable web applications.',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: 'github.com/alexjohnson',
    website: 'alexjohnson.dev',
    experienceYears: '4',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
  });

  const [notifications, setNotifications] = useState({
    emailApplications: true,
    emailJobs: false,
    emailInterviews: true,
    emailWeeklyReport: true,
    pushNew: false,
    pushReminders: true,
  });

  const addSkill = (skill: string) => {
    if (!profile.skills.includes(skill) && profile.skills.length < 20) {
      setProfile((p) => ({ ...p, skills: [...p.skills, skill] }));
    }
  };

  const removeSkill = (skill: string) => {
    setProfile((p) => ({ ...p, skills: p.skills.filter((s) => s !== skill) }));
  };

  const handleSave = () => {
    setSaved(true);
    toast.success('Profile saved!');
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell title="Settings" description="Manage your account and preferences">
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="h-9">
            <TabsTrigger value="profile" className="text-xs gap-1.5">
              <User className="w-3 h-3" />Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs gap-1.5">
              <Bell className="w-3 h-3" />Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="text-xs gap-1.5">
              <Palette className="w-3 h-3" />Appearance
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs gap-1.5">
              <Shield className="w-3 h-3" />Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0 space-y-5">
            <Card className="p-5 border-border">
              <h3 className="font-semibold mb-4">Profile Photo</h3>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-lg bg-primary/10 text-primary font-semibold">
                    {profile.fullName.split(' ').map((n) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm" className="mb-2">
                    <Upload className="w-3.5 h-3.5 mr-1.5" />
                    Upload photo
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG up to 2MB</p>
                </div>
              </div>
            </Card>

            <Card className="p-5 border-border">
              <h3 className="font-semibold mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Full name</Label>
                  <Input
                    value={profile.fullName}
                    onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    value={profile.email}
                    type="email"
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Job title</Label>
                  <Input
                    value={profile.title}
                    onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Senior Frontend Engineer"
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Location</Label>
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                    placeholder="City, State"
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input
                    value={profile.phone}
                    type="tel"
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                    className="h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Years of experience</Label>
                  <Input
                    value={profile.experienceYears}
                    type="number"
                    min="0"
                    max="50"
                    onChange={(e) => setProfile((p) => ({ ...p, experienceYears: e.target.value }))}
                    className="h-9"
                  />
                </div>
                <div className="col-span-full space-y-1.5">
                  <Label>Bio</Label>
                  <Textarea
                    value={profile.bio}
                    onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                    placeholder="A brief description of yourself..."
                    className="min-h-[80px] resize-none"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-5 border-border">
              <h3 className="font-semibold mb-4">Online Profiles</h3>
              <div className="space-y-3">
                {[
                  { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/yourprofile' },
                  { key: 'github', label: 'GitHub', placeholder: 'github.com/yourusername' },
                  { key: 'website', label: 'Website', placeholder: 'yourwebsite.com' },
                ].map((field) => (
                  <div key={field.key} className="flex items-center gap-3">
                    <Label className="w-20 shrink-0 text-xs">{field.label}</Label>
                    <div className="relative flex-1">
                      <Input
                        value={profile[field.key as keyof typeof profile] as string}
                        onChange={(e) => setProfile((p) => ({ ...p, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="h-9 pr-8"
                      />
                      <ExternalLink className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 border-border">
              <h3 className="font-semibold mb-2">Skills</h3>
              <p className="text-xs text-muted-foreground mb-4">These skills are used to match you with jobs and optimize your resume.</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {profile.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                    onClick={() => removeSkill(skill)}
                  >
                    {skill} x
                  </Badge>
                ))}
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">Suggestions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SKILL_SUGGESTIONS.filter((s) => !profile.skills.includes(s)).map((skill) => (
                    <button
                      key={skill}
                      onClick={() => addSkill(skill)}
                      className="text-xs px-2.5 py-1 rounded-full border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            <Button onClick={handleSave} className="w-full sm:w-auto">
              {saved ? <><Check className="w-4 h-4 mr-2" />Saved!</> : 'Save changes'}
            </Button>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 space-y-5">
            <Card className="p-5 border-border">
              <h3 className="font-semibold mb-1">Email Notifications</h3>
              <p className="text-xs text-muted-foreground mb-5">Choose what emails you want to receive.</p>
              <div className="space-y-4">
                {[
                  { key: 'emailApplications', label: 'Application updates', description: 'Status changes and reminders' },
                  { key: 'emailJobs', label: 'New job matches', description: 'Daily digest of matching jobs' },
                  { key: 'emailInterviews', label: 'Interview reminders', description: '24 hours before scheduled interviews' },
                  { key: 'emailWeeklyReport', label: 'Weekly report', description: 'Summary of your job search activity' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications((n) => ({ ...n, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5 border-border">
              <h3 className="font-semibold mb-1">Push Notifications</h3>
              <p className="text-xs text-muted-foreground mb-5">Browser push notifications.</p>
              <div className="space-y-4">
                {[
                  { key: 'pushNew', label: 'New job matches', description: 'Instant notification for high-match jobs' },
                  { key: 'pushReminders', label: 'Task reminders', description: 'Follow-up and deadline reminders' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications((n) => ({ ...n, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Button onClick={() => toast.success('Notification preferences saved!')} className="w-full sm:w-auto">
              Save preferences
            </Button>
          </TabsContent>

          <TabsContent value="appearance" className="mt-0">
            <Card className="p-5 border-border">
              <h3 className="font-semibold mb-1">Theme</h3>
              <p className="text-xs text-muted-foreground mb-5">Choose how CareerOS looks for you.</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'system', label: 'System', icon: Monitor },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTheme(option.value);
                      toast.success(`Theme set to ${option.label}`);
                    }}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      theme === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-foreground/20'
                    }`}
                  >
                    <option.icon className={`w-5 h-5 ${theme === option.value ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-sm font-medium ${theme === option.value ? 'text-primary' : 'text-muted-foreground'}`}>
                      {option.label}
                    </span>
                    {theme === option.value && (
                      <Check className="w-3.5 h-3.5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-0 space-y-5">
            <Card className="p-5 border-border">
              <h3 className="font-semibold mb-1">Change Password</h3>
              <p className="text-xs text-muted-foreground mb-5">Update your password to keep your account secure.</p>
              <div className="space-y-3 max-w-md">
                <div className="space-y-1.5">
                  <Label>Current password</Label>
                  <Input type="password" placeholder="........" className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label>New password</Label>
                  <Input type="password" placeholder="Min. 8 characters" className="h-9" />
                </div>
                <div className="space-y-1.5">
                  <Label>Confirm new password</Label>
                  <Input type="password" placeholder="........" className="h-9" />
                </div>
                <Button onClick={() => toast.success('Password updated!')}>Update password</Button>
              </div>
            </Card>

            <Card className="p-5 border-border">
              <h3 className="font-semibold mb-1">Sessions</h3>
              <p className="text-xs text-muted-foreground mb-4">Manage your active sessions.</p>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                <div>
                  <p className="text-sm font-medium">Current session</p>
                  <p className="text-xs text-muted-foreground">Chrome on macOS - San Francisco, CA</p>
                </div>
                <Badge variant="secondary" className="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-xs">
                  Active
                </Badge>
              </div>
            </Card>

            <Card className="p-5 border-destructive/20 bg-destructive/5">
              <h3 className="font-semibold text-destructive mb-1">Danger Zone</h3>
              <p className="text-xs text-muted-foreground mb-4">These actions are permanent and cannot be undone.</p>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => toast.error('This would delete your account in production')}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Delete account
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
