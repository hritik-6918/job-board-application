
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { JobFilter } from "@/types";
import { getCategories, getLocations } from "@/lib/job-services";

interface JobFiltersProps {
  onFilterChange: (filter: JobFilter) => void;
}

export const JobFilters = ({ onFilterChange }: JobFiltersProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [salary, setSalary] = useState("All");
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  
  useEffect(() => {
    // Load filter options
    const loadFilterOptions = async () => {
      const categoryOptions = await getCategories();
      const locationOptions = await getLocations();
      setCategories(categoryOptions);
      setLocations(locationOptions);
    };
    
    loadFilterOptions();
  }, []);
  
  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [search, category, location, salary]);
  
  const applyFilters = () => {
    onFilterChange({
      search,
      category,
      location,
      salary
    });
  };
  
  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setLocation("All");
    setSalary("All");
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search jobs by title, company, or keywords"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Desktop Filters */}
      <div className="hidden md:flex gap-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={salary} onValueChange={setSalary}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Salary Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Salaries</SelectItem>
            <SelectItem value="Low">Under $80,000</SelectItem>
            <SelectItem value="Medium">$80,000 - $130,000</SelectItem>
            <SelectItem value="High">Above $130,000</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
      </div>
      
      {/* Mobile Filters */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2" size={16} /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Refine your job search with these filters.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Locations</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Salary Range</label>
                <Select value={salary} onValueChange={setSalary}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Salary Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Salaries</SelectItem>
                    <SelectItem value="Low">Under $80,000</SelectItem>
                    <SelectItem value="Medium">$80,000 - $130,000</SelectItem>
                    <SelectItem value="High">Above $130,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={resetFilters} variant="outline" className="w-full">
                Reset Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
