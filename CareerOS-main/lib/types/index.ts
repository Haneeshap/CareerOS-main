/**
 * Type definitions for CareerOS
 * 
 * Centralized type definitions for the entire application
 */

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

// Job types
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  description: string;
  requirements: string[];
  benefits: string[];
  workType: 'full-time' | 'part-time' | 'remote' | 'contract';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  postedAt: Date;
  applied: boolean;
  matchScore?: number;
}

// Application types
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'saved' | 'applied' | 'interview' | 'offer' | 'rejected';
  appliedAt: Date;
  notes?: string;
}

// Resume types
export interface Resume {
  id: string;
  userId: string;
  title: string;
  content: ResumeContent;
  atsScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeContent {
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  certifications: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  achievements: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
}

// Interview types
export interface InterviewQuestion {
  id: string;
  type: 'technical' | 'behavioral' | 'hr';
  question: string;
  answer?: string;
  category: string;
}

// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

// Pagination types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}