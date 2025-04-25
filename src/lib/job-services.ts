import { supabase } from "@/integrations/supabase/client";
import { Job, Application, JobFilter } from "@/types";
import { toast } from "sonner";
import { mockData, delay } from "@/mock/data";

export async function getAllJobs(filter?: JobFilter): Promise<Job[]> {
  let query = supabase.from('jobs').select('*');
  
  if (filter) {
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      query = query.or(
        `title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%`
      );
    }
    
    if (filter.category && filter.category !== "All") {
      query = query.eq('category', filter.category);
    }
    
    if (filter.location && filter.location !== "All") {
      query = query.eq('location', filter.location);
    }
    
    if (filter.salary && filter.salary !== "All") {
      // Simple salary filter - would be more sophisticated in real app
      if (filter.salary === "High") {
        // You might want to parse the salary_range and do more complex filtering
        query = query.gte('salary_range', '$130,000');
      } else if (filter.salary === "Medium") {
        query = query.and(`salary_range.gte.$80,000`, `salary_range.lt.$130,000`);
      } else if (filter.salary === "Low") {
        query = query.lt('salary_range', '$80,000');
      }
    }
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
  
  return data as Job[];
}

export async function getJobById(id: string): Promise<Job | undefined> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error("Error fetching job:", error);
    return undefined;
  }
  
  return data as Job;
}

export async function createJob(jobData: Omit<Job, 'id' | 'created_at'>): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .insert(jobData)
    .select()
    .single();
  
  if (error) {
    console.error("Error creating job:", error);
    toast.error("Failed to create job");
    throw error;
  }
  
  toast.success("Job created successfully!");
  return data as Job;
}

export async function updateJob(id: string, jobData: Partial<Job>): Promise<Job | undefined> {
  const { data, error } = await supabase
    .from('jobs')
    .update(jobData)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error("Error updating job:", error);
    toast.error("Failed to update job");
    return undefined;
  }
  
  toast.success("Job updated successfully!");
  return data as Job;
}

export async function deleteJob(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error("Error deleting job:", error);
    toast.error("Failed to delete job");
    return false;
  }
  
  toast.success("Job deleted successfully!");
  return true;
}

export async function submitApplication(application: Omit<Application, 'id' | 'submitted_at'>): Promise<Application> {
  const { data, error } = await supabase
    .from('applications')
    .insert(application)
    .select()
    .single();
  
  if (error) {
    console.error("Error submitting application:", error);
    toast.error("Failed to submit application");
    throw error;
  }
  
  toast.success("Application submitted successfully!");
  return data as Application;
}

export async function getApplicationsByJobId(jobId: string): Promise<Application[]> {
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .eq('job_id', jobId);
  
  if (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
  
  return data as Application[];
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
