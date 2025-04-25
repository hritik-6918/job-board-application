
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, User } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-xl font-bold text-primary flex items-center">
            <Briefcase className="mr-2" size={24} />
            <span>JobBoard</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/candidate/jobs"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              Find Jobs
            </NavLink>
            <NavLink
              to="/company/jobs"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              For Employers
            </NavLink>
            <div className="flex items-center space-x-4">
              <Button asChild variant="outline" size="sm">
                <NavLink to="/candidate" className="flex items-center">
                  <User className="mr-2" size={16} />
                  Candidate
                </NavLink>
              </Button>
              <Button asChild size="sm">
                <NavLink to="/company" className="flex items-center">
                  <Briefcase className="mr-2" size={16} />
                  Company
                </NavLink>
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <NavLink
                to="/candidate/jobs"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                Find Jobs
              </NavLink>
              <NavLink
                to="/company/jobs"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                For Employers
              </NavLink>
              <div className="flex flex-col space-y-2">
                <Button asChild variant="outline" size="sm" className="justify-center">
                  <NavLink to="/candidate" className="flex items-center">
                    <User className="mr-2" size={16} />
                    Candidate
                  </NavLink>
                </Button>
                <Button asChild size="sm" className="justify-center">
                  <NavLink to="/company" className="flex items-center">
                    <Briefcase className="mr-2" size={16} />
                    Company
                  </NavLink>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
