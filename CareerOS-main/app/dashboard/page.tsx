'use client';

import dynamic from 'next/dynamic';
import { AppShell } from '@/components/app-shell';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MOCK_APPLICATIONS } from '@/lib/mock-data';
import {
  TrendingUp,
  Briefcase,
  Calendar,
  BookmarkCheck,
  ArrowRight,
  Target,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  FileText,
} from 'lucide-react';
import Link from 'next/link';

const ActivityChart = dynamic(
  () => import('@/components/activity-chart').then((m) => m.ActivityChart),
  { ssr: false }
);

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  saved: { label: 'Saved', color: 'text-gray-600 dark:text-gray-400', bg: 'bg-gray-100 dark:bg-gray-800', icon: BookmarkCheck },
  applied: { label: 'Applied', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30', icon: FileText },
  interview: { label: 'Interview', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30', icon: Calendar },
  rejected: { label: 'Rejected', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950/30', icon: XCircle },
  offer: { label: 'Offer', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30', icon: Trophy },
};

export default function DashboardPage() {
  const apps = MOCK_APPLICATIONS;

  const totalApplied = apps.filter((a) => a.status !== 'saved').length;
  const interviews = apps.filter((a) => a.status === 'interview').length;
  const saved = apps.filter((a) => a.status === 'saved').length;
  const offers = apps.filter((a) => a.status === 'offer').length;
  const responseRate = totalApplied > 0 ? Math.round(((interviews + offers) / totalApplied) * 100) : 0;

  const recentApps = apps.slice(0, 5);

  const statCards = [
    {
      label: 'Total Applied',
      value: totalApplied,
      trend: '+8 this week',
      trendUp: true,
      icon: Briefcase,
      color: 'text-blue-600',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      label: 'Interviews',
      value: interviews,
      trend: '+3 this week',
      trendUp: true,
      icon: Calendar,
      color: 'text-amber-600',
      bg: 'bg-amber-50 dark:bg-amber-950/30',
    },
    {
      label: 'Saved Jobs',
      value: saved,
      trend: '2 to apply',
      trendUp: null,
      icon: BookmarkCheck,
      color: 'text-gray-600',
      bg: 'bg-gray-100 dark:bg-gray-800',
    },
    {
      label: 'Response Rate',
      value: `${responseRate}%`,
      trend: '+5% vs avg',
      trendUp: true,
      icon: Target,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
  ];

  return (
    <AppShell title="Dashboard" description="Track your job search progress">
      <div className="p-6 space-y-6 max-w-7xl mx-auto stagger-children">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat) => (
            <Card key={stat.label} className="p-5 card-hover border-border">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                {stat.trendUp !== null && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-muted-foreground'}`}>
                    {stat.trendUp && <TrendingUp className="w-3 h-3" />}
                    {stat.trend}
                  </div>
                )}
              </div>
              <div className="text-2xl font-bold text-foreground animate-count-up">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5 font-medium">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity chart */}
          <Card className="lg:col-span-2 p-5 border-border">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-foreground">Application Activity</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Last 8 weeks</p>
              </div>
              <Badge variant="secondary" className="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200/50">
                <TrendingUp className="w-3 h-3 mr-1" />
                +34% pace
              </Badge>
            </div>
            <ActivityChart />
          </Card>

          {/* Pipeline breakdown */}
          <Card className="p-5 border-border">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-foreground">Pipeline</h3>
              <Link href="/tracker" className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {Object.entries(statusConfig).map(([status, config]) => {
                const count = apps.filter((a) => a.status === status).length;
                const pct = apps.length > 0 ? (count / apps.length) * 100 : 0;
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-1.5">
                        <config.icon className={`w-3.5 h-3.5 ${config.color}`} />
                        <span className="text-muted-foreground font-medium">{config.label}</span>
                      </div>
                      <span className="font-semibold text-foreground">{count}</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent applications */}
          <Card className="lg:col-span-2 p-5 border-border">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-foreground">Recent Applications</h3>
              <Link href="/tracker" className="text-xs text-primary hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentApps.map((app) => {
                const config = statusConfig[app.status];
                return (
                  <div key={app.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                        {app.company_name[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground truncate">{app.company_name}</div>
                        <div className="text-xs text-muted-foreground truncate">{app.job_title}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {app.match_percentage > 0 && (
                        <div className="text-xs text-muted-foreground hidden sm:block">
                          {app.match_percentage}% match
                        </div>
                      )}
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick actions */}
          <Card className="p-5 border-border">
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { href: '/resume', icon: FileText, label: 'Analyze resume', description: 'Get ATS score', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
                { href: '/jobs', icon: Briefcase, label: 'Search jobs', description: 'Find matches', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
                { href: '/tracker', icon: CheckCircle2, label: 'Update tracker', description: '2 pending updates', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
                { href: '/interview', icon: Sparkles, label: 'Practice interview', description: 'AI mock session', color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950/30' },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent transition-colors group"
                >
                  <div className={`w-8 h-8 rounded-lg ${action.bg} flex items-center justify-center shrink-0`}>
                    <action.icon className={`w-4 h-4 ${action.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground">{action.label}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* AI insight banner */}
        <Card className="p-5 border-primary/20 bg-primary/5 border-border">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">AI Insight</h3>
                <Badge variant="secondary" className="text-xs text-primary border-primary/20 bg-primary/10">New</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Your resume is missing keywords for 3 of your saved jobs: <strong className="text-foreground">Docker, Kubernetes, CI/CD</strong>. Adding these could boost your match scores by up to 18%.
              </p>
            </div>
            <Button size="sm" variant="outline" asChild className="shrink-0">
              <Link href="/resume">Fix now</Link>
            </Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
