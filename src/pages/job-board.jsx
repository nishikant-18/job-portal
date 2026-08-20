import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";

import OpportunityCard from "@/components/opportunity-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import { Search, MapPin, Building2 } from "lucide-react";

const JobBoard = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") || "",
  );
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded } = useUser();

  const {
    // loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366F1" />;
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="gradient-title font-extrabold text-5xl sm:text-6xl lg:text-7xl">
          Latest Opportunities
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Explore thousands of job listings and find your perfect match
        </p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row w-full gap-3 bg-card p-4 rounded-xl border border-primary/20"
      >
        <div className="flex flex-1 gap-2 items-center">
          <Search size={20} className="text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search jobs by title, keywords..."
            name="search-query"
            className="border-0 bg-transparent text-base placeholder:text-muted-foreground focus-visible:ring-0 px-0"
          />
        </div>
        <Button type="submit" className="sm:w-auto" variant="primary">
          Search
        </Button>
      </form>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="sm:flex-1">
            <MapPin size={16} className="mr-2" />
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger className="sm:flex-1">
            <Building2 size={16} className="mr-2" />
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="sm:w-auto" variant="outline" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#6366F1" />
      )}

      {loadingJobs === false && (
        <>
          <div className="flex items-center justify-between border-b border-border/60 pb-3 text-sm">
            <p className="text-muted-foreground">
              {jobs?.length || 0} opportunities ready to explore
            </p>
            {(searchQuery || location || company_id) && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                Filters active
              </span>
            )}
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs?.length ? (
              jobs.map((job) => {
                return (
                  <OpportunityCard
                    key={job.id}
                    job={job}
                    savedInit={job?.saved?.length > 0}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No jobs found matching your criteria 😢
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default JobBoard;
