import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { Briefcase, CheckSquare } from "lucide-react";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366F1" />;
  }

  const isCandidate = user?.unsafeMetadata?.role === "candidate";

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="gradient-title font-extrabold text-5xl sm:text-6xl lg:text-7xl flex items-center justify-center gap-3">
          {isCandidate ? (
            <>
              <CheckSquare size={40} className="text-primary" />
              My Applications
            </>
          ) : (
            <>
              <Briefcase size={40} className="text-primary" />
              My Jobs
            </>
          )}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          {isCandidate
            ? "Track and manage all your job applications in one place"
            : "Manage your posted job listings and candidates"}
        </p>
      </div>

      {isCandidate ? <CreatedApplications /> : <CreatedJobs />}
    </div>
  );
};

export default MyJobs;
