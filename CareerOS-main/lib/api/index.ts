/**
 * API Abstraction Layer
 * 
 * Centralized API calls with typed interfaces and error handling
 */
import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Define API request types
export interface JobSearchParams {
  role: string;
  location?: string;
  salaryMin?: number;
  salaryMax?: number;
  workType?: 'full-time' | 'part-time' | 'remote';
}

export interface JobCreateParams {
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string;
  requirements: string[];
  benefits: string[];
  workType: 'full-time' | 'part-time' | 'remote' | 'contract';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
}

export interface JobUpdateParams {
  title?: string;
  company?: string;
  location?: string;
  salary?: number;
  description?: string;
  requirements?: string[];
  benefits?: string[];
  workType?: 'full-time' | 'part-time' | 'remote' | 'contract';
  experienceLevel?: 'entry' | 'mid' | 'senior' | 'lead';
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: number | null;
  description: string;
  requirements: string[];
  benefits: string[];
  workType: 'full-time' | 'part-time' | 'remote' | 'contract';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead';
  postedAt: Date;
  applied: boolean;
  matchScore?: number;
}

// Define API response types
export interface ApiResponse<T> {
  data: T;
  error: string | null;
  status: number;
}

// Initialize API client
const apiClient = {
  searchJobs: async (params: JobSearchParams) => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .match({
          role: params.role,
          location: params.location,
          salary: { gt: params.salaryMin, lt: params.salaryMax },
          work_type: params.workType
        });
      
      if (error) throw error;
      return data as JobListing[];
    } catch (err) {
      console.error('API Error:', err);
      throw new Error('Failed to fetch job listings');
    }
  },
  
  // Add other API methods here (createJob, updateJob, etc.)
};

export default apiClient;