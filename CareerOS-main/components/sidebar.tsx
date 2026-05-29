'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Search,
  Kanban,
  MessageSquare,
  Settings,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/resume', icon: FileText, label: 'Resume' },
  { href: '/jobs', icon: Search, label: 'Job Search' },
  { href: '/tracker', icon: Kanban, label: 'Applications' },
  { href: '/interview', icon: MessageSquare, label: 'Interview Prep' },
];

const bottomItems = [
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'relative flex flex-col h-full bg-card border-r border-border transition-all duration-300 ease-in-out',
        collapsed ? 'w-[64px]' : 'w-[240px]'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-border shrink-0', collapsed && 'justify-center px-0')}>
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary shrink-0">
            <Briefcase className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-base text-foreground tracking-tight">
              Career<span className="text-primary">OS</span>
            </span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'sidebar-link',
                isActive ? 'sidebar-link-active' : 'sidebar-link-inactive',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* AI Badge */}
      {!collapsed && (
        <div className="mx-2 mb-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary">AI Powered</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tailor your resume and generate cover letters with AI.
          </p>
        </div>
      )}

      {/* Bottom nav */}
      <div className="border-t border-border px-2 py-3 space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'sidebar-link',
                isActive ? 'sidebar-link-active' : 'sidebar-link-inactive',
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shadow-sm"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>
    </aside>
  );
}
