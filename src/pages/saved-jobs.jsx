import { getSavedJobs } from "@/api/apiJobs";
import OpportunityCard from "@/components/opportunity-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Heart } from "lucide-react";

const SavedJobs = () => {
  const { isLoaded } = useUser();

  const {
    loading: loadingSavedJobs,
    data: savedJobs,
    fn: fnSavedJobs,
  } = useFetch(getSavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJobs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingSavedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366F1" />;
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="gradient-title font-extrabold text-5xl sm:text-6xl lg:text-7xl flex items-center justify-center gap-3">
          <Heart size={40} className="text-primary fill-primary" />
          Saved Jobs
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Your collection of jobs you&apos;re interested in
        </p>
      </div>

      {loadingSavedJobs === false && (
        <div className="mt-8">
          {savedJobs?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedJobs?.map((saved) => {
                return (
                  <OpportunityCard
                    key={saved.id}
                    job={saved?.job}
                    onJobAction={fnSavedJobs}
                    savedInit={true}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart
                size={48}
                className="mx-auto text-muted-foreground/30 mb-4"
              />
              <p className="text-lg text-muted-foreground">No saved jobs yet</p>
              <p className="text-sm text-muted-foreground">
                Start saving jobs to keep track of opportunities you like
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
