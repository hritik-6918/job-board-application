
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Candidate Pages
import CandidateLayout from "./pages/candidate/CandidateLayout";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import JobsList from "./pages/candidate/jobs/JobsList";
import JobDetail from "./pages/candidate/jobs/JobDetail";
import JobApplication from "./pages/candidate/jobs/JobApplication";

// Company Pages
import CompanyLayout from "./pages/company/CompanyLayout";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import CompanyJobsList from "./pages/company/jobs/CompanyJobsList";
import CreateJob from "./pages/company/jobs/CreateJob";
import JobApplications from "./pages/company/jobs/JobApplications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Candidate Routes */}
          <Route path="/candidate" element={<CandidateLayout />}>
            <Route index element={<CandidateDashboard />} />
            <Route path="jobs" element={<JobsList />} />
          </Route>
          <Route path="/candidate/jobs/:id" element={<JobDetail />} />
          <Route path="/candidate/apply/:jobId" element={<JobApplication />} />
          
          {/* Company Routes */}
          <Route path="/company" element={<CompanyLayout />}>
            <Route index element={<CompanyDashboard />} />
            <Route path="jobs" element={<CompanyJobsList />} />
            <Route path="jobs/new" element={<CreateJob />} />
          </Route>
          <Route path="/company/jobs/:id/applications" element={<JobApplications />} />
          
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
