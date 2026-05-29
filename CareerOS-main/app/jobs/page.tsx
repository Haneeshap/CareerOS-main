'use client';

import { useState, useMemo } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_JOBS } from '@/lib/mock-data';
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Briefcase,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';

const JOB_TYPES = ['All', 'Remote', 'Hybrid', 'On-site'];
const SALARY_RANGES = [
  { label: 'Any', min: 0, max: Infinity },
  { label: '$100k+', min: 100000, max: Infinity },
  { label: '$150k+', min: 150000, max: Infinity },
  { label: '$200k+', min: 200000, max: Infinity },
];

export default function JobsPage() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('All');
  const [salaryRange, setSalaryRange] = useState(SALARY_RANGES[0]);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [selectedJob, setSelectedJob] = useState<(typeof MOCK_JOBS)[0] | null>(null);

  const filtered = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const matchesQuery =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()));

      const matchesLocation =
        !location ||
        job.location.toLowerCase().includes(location.toLowerCase());

      const matchesType =
        jobType === 'All' || job.type === jobType;

      const matchesSalary =
        job.salaryMin >= salaryRange.min &&
        (salaryRange.max === Infinity || job.salaryMax <= salaryRange.max);

      return matchesQuery && matchesLocation && matchesType && matchesSalary;
    });
  }, [query, location, jobType, salaryRange]);

  const toggleSave = (jobId: string) => {
    setSavedJobs((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
        toast.info('Job removed from saved');
      } else {
        next.add(jobId);
        toast.success('Job saved!');
      }
      return next;
    });
  };

  const matchColor = (pct: number) => {
    if (pct >= 90) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30';
    if (pct >= 75) return 'text-blue-600 bg-blue-50 dark:bg-blue-950/30';
    return 'text-amber-600 bg-amber-50 dark:bg-amber-950/30';
  };

  return (
    <AppShell title="Job Search" description="Find your next opportunity with AI-powered matching">
      <div className="p-6 max-w-7xl mx-auto space-y-5">
        <Card className="p-4 border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Job title, company, or skill..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
            <div className="relative flex-1 sm:max-w-[200px]">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-9 h-10"
              />
            </div>
            <Button className="h-10 px-6">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </Card>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">Filters:</span>
          </div>

          <div className="flex gap-1.5">
            {JOB_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setJobType(type)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  jobType === type
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 bg-background'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-border" />

          <div className="flex gap-1.5">
            {SALARY_RANGES.map((range) => (
              <button
                key={range.label}
                onClick={() => setSalaryRange(range)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  salaryRange.label === range.label
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 bg-background'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          <div className="ml-auto text-xs text-muted-foreground">
            {filtered.length} jobs found
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-2 space-y-3">
            {filtered.length === 0 ? (
              <Card className="p-8 text-center border-border">
                <Search className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium">No jobs found</p>
                <p className="text-sm text-muted-foreground mt-1">Try adjusting your search filters</p>
              </Card>
            ) : (
              filtered.map((job) => (
                <Card
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`p-4 cursor-pointer transition-all duration-150 border-border ${
                    selectedJob?.id === job.id
                      ? 'border-primary/50 shadow-sm ring-1 ring-primary/20'
                      : 'hover:border-border hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl ${job.logoColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                      {job.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold text-foreground truncate">{job.title}</h3>
                        {job.isNew && (
                          <Badge className="text-[10px] h-4 px-1.5 bg-primary/10 text-primary border-primary/20 shrink-0">New</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <div className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${matchColor(job.matchPercentage)}`}>
                      {job.matchPercentage}%
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          <div className="lg:col-span-3">
            {selectedJob ? (
              <Card className="p-6 border-border sticky top-6 animate-fade-in">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl ${selectedJob.logoColor} flex items-center justify-center text-white font-bold text-lg`}>
                      {selectedJob.logo}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">{selectedJob.title}</h2>
                      <p className="text-muted-foreground">{selectedJob.company}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${matchColor(selectedJob.matchPercentage)}`}>
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    {selectedJob.matchPercentage}% match
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5 pb-5 border-b border-border">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    {selectedJob.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    {selectedJob.salary}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {selectedJob.posted}
                  </span>
                </div>

                <div className="mb-5">
                  <h4 className="text-sm font-semibold mb-2">About the role</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedJob.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2">Required skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    Apply Now
                    <ExternalLink className="w-3.5 h-3.5 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(selectedJob.id);
                    }}
                    className={savedJobs.has(selectedJob.id) ? 'border-primary text-primary' : ''}
                  >
                    {savedJobs.has(selectedJob.id)
                      ? <BookmarkCheck className="w-4 h-4" />
                      : <Bookmark className="w-4 h-4" />
                    }
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center border-dashed border-border h-64 flex flex-col items-center justify-center">
                <Briefcase className="w-8 h-8 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground text-sm">Select a job to see details</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
