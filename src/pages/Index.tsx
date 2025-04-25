
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, User } from "lucide-react";
import MainLayout from "@/components/Layout/MainLayout";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <MainLayout>
      <div className="flex flex-col items-center text-center py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-primary">
            Connecting Talent with Opportunity
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find your dream job or the perfect candidate with our easy-to-use job board platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <User size={28} className="text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Job Seekers</h2>
              <p className="text-muted-foreground mb-4">
                Browse through hundreds of job opportunities and apply with ease
              </p>
              <Button 
                onClick={() => navigate('/candidate/jobs')}
                className="w-full"
              >
                Find Jobs
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                <Briefcase size={28} className="text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Employers</h2>
              <p className="text-muted-foreground mb-4">
                Post jobs and find the perfect candidates for your open positions
              </p>
              <Button 
                onClick={() => navigate('/company/jobs')}
                className="w-full"
              >
                Post a Job
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 w-full max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Create Profile</h3>
              <p className="text-muted-foreground">
                Sign up as a job seeker or employer to access all features
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Post or Apply</h3>
              <p className="text-muted-foreground">
                Post jobs as an employer or apply to openings as a candidate
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Connect & Grow</h3>
              <p className="text-muted-foreground">
                Find the right talent or opportunity to advance your career
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
