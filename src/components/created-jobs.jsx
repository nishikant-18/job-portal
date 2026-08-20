import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import OpportunityCard from "./opportunity-card";
import { useEffect } from "react";

const CreatedJobs = () => {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loadingCreatedJobs ? (
        <BarLoader className="mt-4" width={"100%"} color="#6366F1" />
      ) : (
        <div className="mt-8">
          {createdJobs?.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {createdJobs.map((job) => {
                return (
                  <OpportunityCard
                    key={job.id}
                    job={job}
                    onJobAction={fnCreatedJobs}
                    isMyJob
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No jobs posted yet
              </p>
              <p className="text-sm text-muted-foreground">
                Start by posting your first job to attract candidates
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
