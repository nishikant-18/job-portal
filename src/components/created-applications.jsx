import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./application-card";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fnApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366F1" />;
  }

  return (
    <div className="space-y-4">
      {applications?.length ? (
        applications.map((application) => {
          return (
            <ApplicationCard
              key={application.id}
              application={application}
              isCandidate={true}
            />
          );
        })
      ) : (
        <div className="text-center py-12 bg-card border border-primary/20 rounded-xl">
          <p className="text-lg text-muted-foreground">No applications yet</p>
          <p className="text-sm text-muted-foreground">
            Browse jobs and apply to opportunities that interest you
          </p>
        </div>
      )}
    </div>
  );
};

export default CreatedApplications;
