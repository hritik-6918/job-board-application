
import { Job, Application, JobFilter } from "@/types";
import { mockData, delay } from "@/mock/data";
import { toast } from "sonner";

// Simulated server functions
export async function getAllJobs(filter?: JobFilter): Promise<Job[]> {
  // Simulate network delay
  await delay(500);
  
  let filteredJobs = [...mockData.jobs];
  
  if (filter) {
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) || 
        job.description.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filter.category && filter.category !== "All") {
      filteredJobs = filteredJobs.filter(job => job.category === filter.category);
    }
    
    if (filter.location && filter.location !== "All") {
      filteredJobs = filteredJobs.filter(job => job.location === filter.location);
    }
    
    if (filter.salary && filter.salary !== "All") {
      // Simple salary filter - would be more sophisticated in real app
      if (filter.salary === "High") {
        filteredJobs = filteredJobs.filter(job => 
          parseInt(job.salary_range.split(' - ')[1].replace('$', '').replace(',', '')) >= 130000
        );
      } else if (filter.salary === "Medium") {
        filteredJobs = filteredJobs.filter(job => {
          const min = parseInt(job.salary_range.split(' - ')[0].replace('$', '').replace(',', ''));
          const max = parseInt(job.salary_range.split(' - ')[1].replace('$', '').replace(',', ''));
          return min >= 80000 && max < 130000;
        });
      } else if (filter.salary === "Low") {
        filteredJobs = filteredJobs.filter(job => 
          parseInt(job.salary_range.split(' - ')[0].replace('$', '').replace(',', '')) < 80000
        );
      }
    }
  }
  
  return filteredJobs;
}

export async function getJobById(id: string): Promise<Job | undefined> {
  await delay(300);
  return mockData.jobs.find(job => job.id === id);
}

export async function createJob(jobData: Omit<Job, 'id' | 'created_at'>): Promise<Job> {
  await delay(800);
  
  const newJob: Job = {
    id: (mockData.jobs.length + 1).toString(),
    ...jobData,
    created_at: new Date().toISOString()
  };
  
  mockData.jobs.push(newJob);
  toast.success("Job created successfully!");
  return newJob;
}

export async function updateJob(id: string, jobData: Partial<Job>): Promise<Job | undefined> {
  await delay(600);
  
  const jobIndex = mockData.jobs.findIndex(job => job.id === id);
  if (jobIndex === -1) return undefined;
  
  mockData.jobs[jobIndex] = {
    ...mockData.jobs[jobIndex],
    ...jobData
  };
  
  toast.success("Job updated successfully!");
  return mockData.jobs[jobIndex];
}

export async function deleteJob(id: string): Promise<boolean> {
  await delay(500);
  
  const initialLength = mockData.jobs.length;
  mockData.jobs = mockData.jobs.filter(job => job.id !== id);
  
  if (mockData.jobs.length < initialLength) {
    toast.success("Job deleted successfully!");
    return true;
  }
  return false;
}

export async function submitApplication(application: Omit<Application, 'id' | 'submitted_at'>): Promise<Application> {
  await delay(1000);
  
  const newApplication: Application = {
    id: (mockData.applications.length + 1).toString(),
    ...application,
    submitted_at: new Date().toISOString()
  };
  
  mockData.applications.push(newApplication);
  toast.success("Application submitted successfully!");
  return newApplication;
}

export async function getApplicationsByJobId(jobId: string): Promise<Application[]> {
  await delay(400);
  return mockData.applications.filter(app => app.job_id === jobId);
}

// Helper functions for filtering options
export function getCategories(): string[] {
  const categories = new Set<string>();
  mockData.jobs.forEach(job => categories.add(job.category));
  return Array.from(categories);
}

export function getLocations(): string[] {
  const locations = new Set<string>();
  mockData.jobs.forEach(job => locations.add(job.location));
  return Array.from(locations);
}
