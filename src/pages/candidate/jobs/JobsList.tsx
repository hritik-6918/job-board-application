
import { useState, useEffect } from "react";
import { getAllJobs } from "@/lib/job-services";
import { Job, JobFilter } from "@/types";
import { JobCard } from "@/components/Jobs/JobCard";
import { JobFilters } from "@/components/Jobs/JobFilters";
import { Skeleton } from "@/components/ui/skeleton";

const JobsList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<JobFilter>({
    search: "",
    category: "All",
    location: "All",
    salary: "All"
  });
  
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const jobsData = await getAllJobs(filter);
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [filter]);
  
  const handleFilterChange = (newFilter: JobFilter) => {
    setFilter(newFilter);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Positions</h2>
        <JobFilters onFilterChange={handleFilterChange} />
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="border rounded-lg p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-20 w-full mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No jobs match your search criteria.</p>
          <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default JobsList;
