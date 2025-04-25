
import { MockData } from "@/types";

// Mock data for development
export const mockData: MockData = {
  jobs: [
    {
      id: "1",
      title: "Frontend Developer",
      company: "TechCorp",
      description: "We're looking for a skilled Frontend Developer to join our team and help build responsive web applications using React, TypeScript, and modern CSS frameworks.",
      category: "Development",
      location: "Remote",
      salary_range: "$80,000 - $120,000",
      created_at: "2025-04-20T12:00:00Z"
    },
    {
      id: "2",
      title: "UX Designer",
      company: "DesignHub",
      description: "Join our creative team as a UX Designer to craft beautiful, intuitive user experiences for web and mobile applications.",
      category: "Design",
      location: "New York, NY",
      salary_range: "$90,000 - $130,000",
      created_at: "2025-04-19T15:30:00Z"
    },
    {
      id: "3",
      title: "DevOps Engineer",
      company: "CloudScale",
      description: "We're seeking an experienced DevOps Engineer to maintain our cloud infrastructure and CI/CD pipelines.",
      category: "Operations",
      location: "San Francisco, CA",
      salary_range: "$110,000 - $150,000",
      created_at: "2025-04-21T09:45:00Z"
    },
    {
      id: "4",
      title: "Data Scientist",
      company: "DataInsight",
      description: "Join our data team to build machine learning models and generate insights from large datasets.",
      category: "Data Science",
      location: "Boston, MA",
      salary_range: "$100,000 - $140,000",
      created_at: "2025-04-18T14:20:00Z"
    },
    {
      id: "5",
      title: "Backend Developer",
      company: "ServerLogic",
      description: "Build robust APIs and microservices using Node.js, PostgreSQL, and Docker.",
      category: "Development",
      location: "Remote",
      salary_range: "$85,000 - $125,000",
      created_at: "2025-04-22T10:15:00Z"
    },
    {
      id: "6",
      title: "Product Manager",
      company: "ProductFlow",
      description: "Lead product development from ideation to market release, working with cross-functional teams.",
      category: "Management",
      location: "Chicago, IL",
      salary_range: "$95,000 - $135,000",
      created_at: "2025-04-17T11:30:00Z"
    }
  ],
  applications: [
    {
      id: "1",
      job_id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      resume_link: "https://example.com/alex-resume.pdf",
      cover_letter: "I'm excited about the Frontend Developer position at TechCorp. With 5 years of experience in React and TypeScript...",
      submitted_at: "2025-04-22T14:30:00Z"
    },
    {
      id: "2",
      job_id: "1",
      name: "Jamie Smith",
      email: "jamie.smith@example.com",
      resume_link: "https://example.com/jamie-resume.pdf",
      cover_letter: "As a passionate frontend developer with expertise in building responsive interfaces...",
      submitted_at: "2025-04-23T09:15:00Z"
    },
    {
      id: "3",
      job_id: "2",
      name: "Taylor Wilson",
      email: "taylor.wilson@example.com",
      resume_link: "https://example.com/taylor-resume.pdf",
      cover_letter: "I've been working as a UX Designer for over 3 years and am very interested in joining DesignHub...",
      submitted_at: "2025-04-21T16:45:00Z"
    }
  ]
};

// Mock function for simulating server actions
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
