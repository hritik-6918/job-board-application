
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getJobById } from "@/lib/job-services";
import { Job } from "@/types";
import { Briefcase, ArrowLeft, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchJob = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const jobData = await getJobById(id);
        if (jobData) {
          setJob(jobData);
        } else {
          // Job not found
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJob();
  }, [id, navigate]);
  
  // Format date to a readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Jobs
      </Button>
      
      {loading ? (
        <div>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-40 w-full mb-6" />
          <Skeleton className="h-10 w-1/3 mb-2" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : job ? (
        <div>
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <div className="flex justify-between items-start flex-wrap">
              <div>
                <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{job.company}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  {job.category}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center text-muted-foreground">
                <Briefcase className="mr-2" size={16} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2" size={16} />
                <span>Posted on {formatDate(job.created_at)}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Job Description</h2>
                <span className="font-medium text-primary">{job.salary_range}</span>
              </div>
              <p className="text-muted-foreground whitespace-pre-line">
                {job.description}
              </p>
            </div>
            
            <Button 
              onClick={() => navigate(`/candidate/apply/${job.id}`)}
              size="lg"
              className="w-full sm:w-auto"
            >
              Apply Now
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>About {job.company}</CardTitle>
              <CardDescription>
                Learn more about the company
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {job.company} is a leading company in the {job.category} industry, offering competitive benefits and a positive work environment.
              </p>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Company information is for demonstration purposes only.
              </p>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Job not found</p>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
