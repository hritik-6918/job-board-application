
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Briefcase } from "lucide-react";

const CandidateDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Find Your Next Opportunity</CardTitle>
            <CardDescription>
              Browse the latest job openings from top companies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <Search size={48} className="text-primary" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/candidate/jobs")} className="w-full">
              Browse Jobs
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Job Applications</CardTitle>
            <CardDescription>
              Track and manage your submitted applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <Briefcase size={48} className="text-primary" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-muted/40 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Job Seeker Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-md border">
            <h3 className="font-medium mb-2">Resume Tips</h3>
            <p className="text-sm text-muted-foreground">
              Learn how to craft a resume that stands out to employers
            </p>
          </div>
          <div className="bg-white p-4 rounded-md border">
            <h3 className="font-medium mb-2">Interview Preparation</h3>
            <p className="text-sm text-muted-foreground">
              Tips and strategies to ace your next job interview
            </p>
          </div>
          <div className="bg-white p-4 rounded-md border">
            <h3 className="font-medium mb-2">Career Development</h3>
            <p className="text-sm text-muted-foreground">
              Resources to help you grow professionally
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
