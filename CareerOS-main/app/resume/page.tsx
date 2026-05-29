'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Code2,
  Wand2,
  RotateCcw,
  Copy,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

const MOCK_RESUME = {
  fileName: 'Alex_Johnson_Resume.pdf',
  atsScore: 78,
  skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'Jest', 'Figma'],
  missingKeywords: ['Kubernetes', 'CI/CD', 'Redis', 'Terraform', 'gRPC'],
  experience: [
    {
      company: 'TechCorp Inc.',
      role: 'Senior Frontend Engineer',
      duration: 'Jan 2022 – Present',
      bullets: [
        'Led migration of legacy React codebase to TypeScript, reducing bugs by 40%',
        'Built real-time dashboard using WebSockets serving 50k+ daily users',
        'Mentored 3 junior engineers and conducted 20+ technical interviews',
      ],
    },
    {
      company: 'StartupXYZ',
      role: 'Frontend Engineer',
      duration: 'Jun 2020 – Dec 2021',
      bullets: [
        'Developed responsive UI components in React used across 5 product lines',
        'Improved page load speed by 35% through code splitting and lazy loading',
        'Collaborated with design team to implement pixel-perfect Figma designs',
      ],
    },
  ],
  education: [
    {
      institution: 'UC Berkeley',
      degree: 'B.S. Computer Science',
      year: '2020',
    },
  ],
  suggestions: [
    { type: 'error', text: 'Add quantified achievements to education section' },
    { type: 'warning', text: 'Missing a professional summary/objective section' },
    { type: 'warning', text: 'No mention of Kubernetes or CI/CD despite popular demand' },
    { type: 'info', text: 'Consider adding links to portfolio or GitHub projects' },
    { type: 'success', text: 'Strong quantified achievements in experience section' },
    { type: 'success', text: 'Good variety of technical skills listed' },
  ],
};

const scoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

const scoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Fair';
  return 'Poor';
};

export default function ResumePage() {
  const [hasResume, setHasResume] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [tailoring, setTailoringResults] = useState<string[] | null>(null);
  const [isTailoring, setIsTailoring] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (file: File) => {
    if (!file.name.match(/\.(pdf|docx|doc)$/i)) {
      toast.error('Please upload a PDF or DOCX file');
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResume(true);
      toast.success('Resume analyzed successfully!');
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleTailoring = () => {
    if (!jobDescription.trim()) {
      toast.error('Please paste a job description first');
      return;
    }
    setIsTailoring(true);
    setTimeout(() => {
      setIsTailoring(false);
      setTailoringResults([
        'Led migration of legacy React codebase to TypeScript, achieving 40% bug reduction and improving developer experience for a team of 8 engineers',
        'Architected and deployed real-time analytics dashboard using WebSockets and Redis, scaling to 50k+ concurrent users with 99.9% uptime',
        'Established CI/CD pipeline using GitHub Actions and Docker, reducing deployment time from 2 hours to 15 minutes',
        'Mentored 3 junior engineers through code reviews and 1:1 sessions, with all 3 receiving promotions within 18 months',
      ]);
      toast.success('Resume tailored to job description!');
    }, 3000);
  };

  const handleCopy = () => {
    if (tailoring) {
      navigator.clipboard.writeText(tailoring.join('\n• '));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const suggestionConfig = {
    error: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/20 border-red-200/50 dark:border-red-900/30' },
    warning: { icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-900/30' },
    info: { icon: AlertCircle, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-900/30' },
    success: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/30' },
  };

  return (
    <AppShell title="Resume" description="AI-powered resume analysis and optimization">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {!hasResume ? (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-border">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Upload Your Resume</h2>
                <p className="text-muted-foreground text-sm">
                  Get an instant ATS score, identify missing keywords, and receive AI suggestions.
                </p>
              </div>

              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
                  isDragging
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-accent/50'
                }`}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileInput}
                />
                {isAnalyzing ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-medium text-foreground">Analyzing your resume...</p>
                    <p className="text-xs text-muted-foreground">Extracting skills, experience, and calculating ATS score</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground mb-1">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">Supports PDF, DOC, DOCX (max 10MB)</p>
                  </>
                )}
              </div>

              <div className="mt-4 flex gap-3">
                <Button className="flex-1" onClick={() => document.getElementById('file-input')?.click()} disabled={isAnalyzing}>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                </Button>
                <Button variant="outline" onClick={() => setHasResume(true)}>
                  Use sample resume
                </Button>
              </div>
            </Card>
          </div>
        ) : (
          <Tabs defaultValue="analysis" className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList className="h-9">
                <TabsTrigger value="analysis" className="text-xs">Analysis</TabsTrigger>
                <TabsTrigger value="tailor" className="text-xs">AI Tailor</TabsTrigger>
                <TabsTrigger value="cover-letter" className="text-xs">Cover Letter</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground">{MOCK_RESUME.fileName}</div>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setHasResume(false)}>
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Replace
                </Button>
              </div>
            </div>

            <TabsContent value="analysis" className="space-y-6 mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6 border-border text-center">
                  <h3 className="font-semibold mb-4">ATS Score</h3>
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                      <circle
                        cx="50" cy="50" r="42"
                        fill="none"
                        stroke={MOCK_RESUME.atsScore >= 80 ? '#10b981' : MOCK_RESUME.atsScore >= 60 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${MOCK_RESUME.atsScore * 2.64} 264`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-2xl font-bold ${scoreColor(MOCK_RESUME.atsScore)}`}>
                        {MOCK_RESUME.atsScore}
                      </span>
                      <span className="text-xs text-muted-foreground">/ 100</span>
                    </div>
                  </div>
                  <Badge className={`${MOCK_RESUME.atsScore >= 80 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'} dark:bg-transparent`}>
                    {scoreLabel(MOCK_RESUME.atsScore)}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    Your resume passes most ATS filters. A few improvements could push it above 85.
                  </p>
                </Card>

                <Card className="p-6 border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">Detected Skills</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {MOCK_RESUME.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="border-t border-border pt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Missing high-demand skills:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {MOCK_RESUME.missingKeywords.map((kw) => (
                        <Badge key={kw} variant="outline" className="text-xs text-red-600 border-red-200 bg-red-50 dark:bg-red-950/20">
                          + {kw}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <h3 className="font-semibold">AI Suggestions</h3>
                  </div>
                  <div className="space-y-2">
                    {MOCK_RESUME.suggestions.map((s, i) => {
                      const config = suggestionConfig[s.type as keyof typeof suggestionConfig];
                      return (
                        <div key={i} className={`flex items-start gap-2 p-2.5 rounded-lg border text-xs ${config.bg}`}>
                          <config.icon className={`w-3.5 h-3.5 ${config.color} shrink-0 mt-0.5`} />
                          <span className="text-foreground">{s.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>

              <Card className="p-6 border-border">
                <div className="flex items-center gap-2 mb-5">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Work Experience</h3>
                </div>
                <div className="space-y-6">
                  {MOCK_RESUME.experience.map((exp, i) => (
                    <div key={i} className={i > 0 ? 'pt-6 border-t border-border' : ''}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">{exp.role}</h4>
                          <p className="text-sm text-muted-foreground">{exp.company}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{exp.duration}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Education</h3>
                </div>
                {MOCK_RESUME.education.map((edu, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{edu.institution}</h4>
                      <p className="text-sm text-muted-foreground">{edu.degree}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{edu.year}</span>
                  </div>
                ))}
              </Card>
            </TabsContent>

            <TabsContent value="tailor" className="space-y-6 mt-0">
              <Card className="p-6 border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">AI Resume Tailoring</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Paste a job description below and our AI will rewrite your resume bullet points to match the role, highlight relevant keywords, and boost your ATS score.
                </p>
                <Textarea
                  placeholder="Paste the full job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[160px] resize-none mb-4"
                />
                <Button onClick={handleTailoring} disabled={isTailoring} className="w-full sm:w-auto">
                  {isTailoring ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      Tailoring...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Tailor My Resume
                    </>
                  )}
                </Button>
              </Card>

              {tailoring && (
                <Card className="p-6 border-border animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <h3 className="font-semibold">Tailored Bullet Points</h3>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                      {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                      {copied ? 'Copied!' : 'Copy all'}
                    </Button>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                    {tailoring.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span className="text-foreground">{bullet}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-emerald-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>Estimated ATS score improvement: <strong>+16 points</strong></span>
                  </div>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="cover-letter" className="mt-0">
              <CoverLetterGenerator />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AppShell>
  );
}

function CoverLetterGenerator() {
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!company || !jobTitle) {
      toast.error('Please fill in company name and job title');
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setResult(`Dear ${company} Hiring Team,

I am excited to apply for the ${jobTitle} position at ${company}. With over 4 years of experience building high-performance web applications using React, TypeScript, and Node.js, I am confident that my technical expertise and passion for creating exceptional user experiences align perfectly with your team's mission.

In my current role at TechCorp Inc., I led a major codebase migration that reduced bugs by 40% and improved developer productivity significantly. I also architected a real-time dashboard serving 50,000+ daily users, demonstrating my ability to build scalable systems that handle production-level traffic.

What excites me most about ${company} is your commitment to building tools that developers and teams genuinely love. I've been an admirer of your product philosophy and the thoughtful engineering decisions behind your platform. I believe my experience with performance optimization, real-time features, and developer experience makes me a strong fit for this role.

I would love the opportunity to discuss how my skills and experience can contribute to ${company}'s continued growth. Thank you for considering my application.

Best regards,
Alex Johnson`);
      toast.success('Cover letter generated!');
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 border-border">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Cover Letter Generator</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Company Name</label>
            <input
              type="text"
              placeholder="e.g. Stripe"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Job Title</label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Engineer"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
        <div className="space-y-1.5 mb-4">
          <label className="text-sm font-medium">Job Description (optional)</label>
          <Textarea
            placeholder="Paste job description for a more personalized cover letter..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>
        <Button onClick={handleGenerate} disabled={generating}>
          {generating ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Cover Letter
            </>
          )}
        </Button>
      </Card>

      {result && (
        <Card className="p-6 border-border animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Generated Cover Letter</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(result);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <div className="bg-muted/30 rounded-xl p-5">
            <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">{result}</pre>
          </div>
        </Card>
      )}
    </div>
  );
}
