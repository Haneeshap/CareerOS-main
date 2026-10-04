import { createClient } from '@supabase/supabase-js';

// Values are injected at build time from environment variables so the same
// codebase can target local, preview and production Supabase projects.
// Configure them in .env.local (git-ignored) or in your host's dashboard.
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://mrkjknuhwdyfwmjhagur.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ya2prbnVod2R5ZndtamhhZ3VyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMjc3MjcsImV4cCI6MjA5NTYwMzcyN30.4jrcLvb2-lMniNiT0TMt3FbI5fIlN0xz8dlQ8xv1MUA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  title: string | null;
  location: string | null;
  phone: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  website_url: string | null;
  bio: string | null;
  skills: string[];
  experience_years: number;
  created_at: string;
  updated_at: string;
};

export type Resume = {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string | null;
  parsed_skills: string[];
  parsed_experience: ExperienceItem[];
  parsed_education: EducationItem[];
  ats_score: number;
  ai_suggestions: string[];
  raw_text: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  description: string;
  bullets: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  field: string;
  year: string;
};

export type ApplicationStatus = 'saved' | 'applied' | 'interview' | 'rejected' | 'offer';

export type Application = {
  id: string;
  user_id: string;
  company_name: string;
  job_title: string;
  job_url: string | null;
  job_description: string | null;
  status: ApplicationStatus;
  salary_min: number | null;
  salary_max: number | null;
  location: string | null;
  is_remote: boolean;
  notes: string | null;
  applied_date: string | null;
  interview_date: string | null;
  tags: string[];
  match_percentage: number;
  created_at: string;
  updated_at: string;
};
