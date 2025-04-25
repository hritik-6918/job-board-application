
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Plus, Users } from "lucide-react";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Post a New Job</CardTitle>
            <CardDescription>
              Create a new job listing to attract qualified candidates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <Plus size={48} className="text-primary" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/company/jobs/new")} className="w-full">
              Post a Job
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Job Listings</CardTitle>
            <CardDescription>
              View and manage your current job postings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <Briefcase size={48} className="text-primary" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/company/jobs")} variant="outline" className="w-full">
              View Jobs
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-muted/40 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Employer Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-md border">
            <h3 className="font-medium mb-2">Writing Effective Job Descriptions</h3>
            <p className="text-sm text-muted-foreground">
              Learn how to create compelling job listings that attract top talent
            </p>
          </div>
          <div className="bg-white p-4 rounded-md border">
            <h3 className="font-medium mb-2">Screening Candidates</h3>
            <p className="text-sm text-muted-foreground">
              Tips for efficiently reviewing applications and resumes
            </p>
          </div>
          <div className="bg-white p-4 rounded-md border">
            <h3 className="font-medium mb-2">Remote Hiring</h3>
            <p className="text-sm text-muted-foreground">
              Best practices for hiring and onboarding remote employees
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
