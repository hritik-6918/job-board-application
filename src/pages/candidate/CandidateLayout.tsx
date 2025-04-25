
import { Outlet } from "react-router-dom";
import MainLayout from "@/components/Layout/MainLayout";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavLink, useLocation } from "react-router-dom";

const CandidateLayout = () => {
  const location = useLocation();
  const currentTab = location.pathname.includes('/jobs') ? 'jobs' : 'dashboard';
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Candidate Portal</h1>
        <Tabs value={currentTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard" asChild>
              <NavLink to="/candidate" end className="w-full">Dashboard</NavLink>
            </TabsTrigger>
            <TabsTrigger value="jobs" asChild>
              <NavLink to="/candidate/jobs" className="w-full">Browse Jobs</NavLink>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Outlet />
    </MainLayout>
  );
};

export default CandidateLayout;
