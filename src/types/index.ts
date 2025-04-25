
export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  category: string;
  location: string;
  salary_range: string;
  created_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_letter: string;
  submitted_at: string;
}

export interface JobFilter {
  search: string;
  category: string;
  location: string;
  salary: string;
}

// Mock data types
export interface MockData {
  jobs: Job[];
  applications: Application[];
}
