
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Job } from "@/types";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Briefcase } from "lucide-react";

interface JobCardProps {
  job: Job;
  isCompanyView?: boolean;
}

export const JobCard = ({ job, isCompanyView = false }: JobCardProps) => {
  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
            {job.category}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Briefcase className="mr-2" size={14} />
            <span>{job.location}</span>
          </div>
          <div className="text-sm font-medium">{job.salary_range}</div>
          <p className="text-sm text-muted-foreground line-clamp-3 mt-2">
            {job.description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="text-xs text-muted-foreground">
          Posted on {formatDate(job.created_at)}
        </div>
        <div>
          {isCompanyView ? (
            <div className="flex space-x-2">
              <Button asChild variant="outline" size="sm">
                <NavLink to={`/company/jobs/${job.id}/applications`}>
                  View Applications
                </NavLink>
              </Button>
              <Button asChild variant="outline" size="sm">
                <NavLink to={`/company/jobs/${job.id}/edit`}>
                  Edit
                </NavLink>
              </Button>
            </div>
          ) : (
            <Button asChild size="sm">
              <NavLink to={`/candidate/jobs/${job.id}`}>
                View Details
              </NavLink>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
