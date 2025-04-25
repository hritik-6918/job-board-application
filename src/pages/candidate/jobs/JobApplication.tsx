
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getJobById, submitApplication } from "@/lib/job-services";
import { Job } from "@/types";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  resume_link: z.string().url("Please enter a valid URL"),
  cover_letter: z.string().min(50, "Cover letter must be at least 50 characters"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const JobApplication = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      resume_link: "",
      cover_letter: "",
    },
  });
  
  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;
      
      try {
        setLoading(true);
        const jobData = await getJobById(jobId);
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
  }, [jobId, navigate]);
  
  const onSubmit = async (data: ApplicationFormValues) => {
    if (!jobId) return;
    
    setSubmitting(true);
    try {
      await submitApplication({
        job_id: jobId,
        ...data,
      });
      
      toast.success("Application submitted successfully!");
      navigate(`/candidate/jobs/${jobId}?applied=true`);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center"
      >
        <ArrowLeft className="mr-2" size={16} />
        Back to Job
      </Button>
      
      {loading ? (
        <div>
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-40 w-full mb-4" />
        </div>
      ) : job ? (
        <div>
          <h1 className="text-2xl font-bold mb-2">Apply for {job.title}</h1>
          <p className="text-muted-foreground mb-8">at {job.company}</p>
          
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="resume_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resume Link</FormLabel>
                      <FormControl>
                        <Input placeholder="https://drive.google.com/your-resume" type="url" {...field} />
                      </FormControl>
                      <FormDescription>
                        Link to your resume (Google Drive, Dropbox, etc.)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="cover_letter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cover Letter</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us why you're interested in this position..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4 flex justify-end">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">Job not found</p>
        </div>
      )}
    </div>
  );
};

export default JobApplication;
