'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Briefcase,
  Sparkles,
  FileText,
  Search,
  Kanban,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Star,
  TrendingUp,
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'AI Resume Analysis',
    description: 'Upload your resume and get instant ATS score, missing keyword analysis, and AI-powered improvement suggestions.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    icon: Search,
    title: 'Smart Job Search',
    description: 'Search thousands of jobs with AI-powered match scoring. Filter by role, location, salary, and work type.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    icon: Sparkles,
    title: 'Resume Tailoring',
    description: 'Paste a job description and our AI rewrites your bullet points to match — boosting your ATS score significantly.',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
  },
  {
    icon: FileText,
    title: 'Cover Letter Generator',
    description: 'Generate personalized, compelling cover letters in seconds using your resume and the job description.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
  },
  {
    icon: Kanban,
    title: 'Application Tracker',
    description: 'Visual Kanban board to track every application from Saved to Offer. Never miss a follow-up again.',
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
  },
  {
    icon: MessageSquare,
    title: 'Interview Prep',
    description: 'AI-generated technical, behavioral, and HR questions tailored to each role. Practice with a mock interview chat.',
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
  },
];

const stats = [
  { label: 'Job seekers helped', value: '50,000+' },
  { label: 'Interviews landed', value: '12,000+' },
  { label: 'Offers received', value: '3,200+' },
  { label: 'Avg. ATS score boost', value: '+34%' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer at Stripe',
    avatar: 'SC',
    content: 'CareerOS completely transformed my job search. The AI resume tailoring got me 3x more callbacks than before.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Product Manager at Notion',
    avatar: 'MJ',
    content: "The application tracker kept me sane during my 2-month search. I always knew exactly where I stood with every company.",
    rating: 5,
  },
  {
    name: 'Priya Patel',
    role: 'Frontend Engineer at Vercel',
    avatar: 'PP',
    content: 'The interview prep feature helped me nail my technical interviews. Got an offer from my dream company!',
    rating: 5,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-cover bg-fixed animate-gradient">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background/30 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <Briefcase className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Career<span className="text-primary">OS</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it works</Link>
            <Link href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">
                Get started free
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
        <Badge variant="secondary" className="mb-6 text-primary border-primary/20 bg-primary/5">
          <Sparkles className="w-3 h-3 mr-1.5" />
          AI-Powered Job Search Platform
        </Badge>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          Land your dream job{' '}
          <span className="gradient-text">10x faster</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          CareerOS combines AI-powered resume analysis, smart job matching, application tracking, and interview preparation — everything you need to succeed in your job search.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button size="lg" asChild className="h-12 px-8 text-base">
            <Link href="/signup">
              Start for free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="h-12 px-8 text-base">
            <Link href="/dashboard">
              View demo
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard preview */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-border overflow-hidden shadow-2xl shadow-black/5">
          <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <div className="flex-1 mx-4 bg-background rounded-md h-7 flex items-center px-3">
              <span className="text-xs text-muted-foreground">careeros.ai/dashboard</span>
            </div>
          </div>
          <div className="bg-card p-6 min-h-[400px] flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Total Applied', value: '47', trend: '+8 this week', color: 'text-blue-500' },
                  { label: 'Interviews', value: '12', trend: '+3 this week', color: 'text-emerald-500' },
                  { label: 'Offers', value: '2', trend: 'Active', color: 'text-amber-500' },
                  { label: 'Response Rate', value: '34%', trend: '+5% vs avg', color: 'text-cyan-500' },
                ].map((card) => (
                  <div key={card.label} className="rounded-xl border border-border bg-background p-4">
                    <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
                    <div className="text-xs font-medium text-muted-foreground mt-0.5">{card.label}</div>
                    <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {card.trend}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 rounded-xl border border-border bg-background p-4">
                  <div className="text-sm font-semibold mb-3">Recent Applications</div>
                  <div className="space-y-2">
                    {[
                      { company: 'Stripe', role: 'Senior Frontend Engineer', status: 'Interview', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
                      { company: 'Vercel', role: 'Frontend Engineer', status: 'Applied', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
                      { company: 'Notion', role: 'Product Engineer', status: 'Offer', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
                    ].map((app) => (
                      <div key={app.company} className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-medium">{app.company}</span>
                          <span className="text-muted-foreground ml-2">{app.role}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${app.color}`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="text-sm font-semibold mb-3">ATS Score</div>
                  <div className="flex items-center justify-center h-20">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-500">87</div>
                      <div className="text-xs text-muted-foreground">/ 100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-primary border-primary/20 bg-primary/5">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to land the job
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete toolkit built for modern job seekers. From resume to offer letter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 border-border bg-white/10 backdrop-blur-md">
              <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-muted/30 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/20 bg-primary/5">
              How it works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Get started in minutes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Upload your resume',
                description: 'Upload your PDF or DOCX resume. Our AI parses it instantly, extracting skills, experience, and education.',
                icon: FileText,
              },
              {
                step: '02',
                title: 'Find matching jobs',
                description: 'Browse AI-curated job listings with match scores. Tailor your resume to each job with one click.',
                icon: Search,
              },
              {
                step: '03',
                title: 'Track and prepare',
                description: 'Track all your applications on a Kanban board and prepare for interviews with AI-generated questions.',
                icon: Kanban,
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-primary border-primary/20 bg-primary/5">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Loved by job seekers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="p-6 border-border">
              <div className="flex mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">"{t.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-2xl bg-primary p-12 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to land your dream job?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8 text-lg">
            Join 50,000+ job seekers who use CareerOS to accelerate their career.
          </p>
          <Button size="lg" variant="secondary" asChild className="h-12 px-8 text-base">
            <Link href="/signup">
              Get started free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-primary-foreground/60">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-primary">
              <Briefcase className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sm">
              Career<span className="text-primary">OS</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 CareerOS. Built with AI for the modern job seeker.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
