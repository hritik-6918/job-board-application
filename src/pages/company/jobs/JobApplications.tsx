
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getJobById, getApplicationsByJobId } from "@/lib/job-services";
import { Job, Application } from "@/types";
import { ArrowLeft, Mail, File } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const JobApplications = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const [jobData, applicationsData] = await Promise.all([
          getJobById(id),
          getApplicationsByJobId(id),
        ]);
        
        if (jobData) {
          setJob(jobData);
          setApplications(applicationsData);
        } else {
          // Job not found
          navigate("/not-found");
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id, navigate]);
  
  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate("/company/jobs")}
        className="mb-6 flex items-center"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Jobs
      </Button>
      
      {loading ? (
        <div>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-6" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : job ? (
        <div>
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Applications for {job.title}</h1>
            <p className="text-muted-foreground">
              {applications.length} application{applications.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {applications.length > 0 ? (
            <div className="space-y-6">
              {applications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{application.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Mail className="mr-1" size={14} />
                          {application.email}
                        </CardDescription>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Applied: {formatDate(application.submitted_at)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Cover Letter</h3>
                        <p className="text-muted-foreground whitespace-pre-line">{application.cover_letter}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="flex items-center">
                      <a href={application.resume_link} target="_blank" rel="noopener noreferrer">
                        <File className="mr-2" size={16} />
                        View Resume
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <p className="text-xl text-muted-foreground mb-4">No applications yet</p>
              <p className="text-muted-foreground">
                You'll see applications here once candidates apply for this position.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Job not found</p>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
