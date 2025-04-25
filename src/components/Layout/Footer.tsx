
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">JobBoard</h3>
            <p className="text-muted-foreground text-sm">
              Connecting talented professionals with their dream jobs and helping companies find the perfect candidates.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">For Candidates</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/candidate/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Jobs
                </NavLink>
              </li>
              <li>
                <NavLink to="/candidate" className="text-muted-foreground hover:text-primary transition-colors">
                  Candidate Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/company/jobs/new" className="text-muted-foreground hover:text-primary transition-colors">
                  Post a Job
                </NavLink>
              </li>
              <li>
                <NavLink to="/company/jobs" className="text-muted-foreground hover:text-primary transition-colors">
                  Manage Listings
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} JobBoard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
