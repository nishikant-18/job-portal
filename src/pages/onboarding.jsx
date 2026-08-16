import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Briefcase, Users } from "lucide-react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = (currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  };

  const handleRoleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        console.log(`Role updated to: ${role}`);
        navigateUser(role);
      })
      .catch((err) => {
        console.error("Error updating role:", err);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user.unsafeMetadata.role);
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366F1" />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="text-center space-y-3">
        <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl lg:text-8xl tracking-tighter">
          Welcome to HireGram
        </h1>
        <p className="text-muted-foreground text-lg">
          Let's get started! Choose your role to get the best experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl px-4">
        {/* Candidate Card */}
        <div
          className="group bg-card border border-primary/20 rounded-xl p-8 cursor-pointer transition-all hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20"
          onClick={() => handleRoleSelection("candidate")}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-lg mx-auto group-hover:bg-primary/30 transition-colors">
              <Briefcase size={32} className="text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Job Seeker</h3>
              <p className="text-muted-foreground text-sm">
                Search and apply to amazing opportunities
              </p>
            </div>
            <Button
              className="w-full"
              variant="primary"
              onClick={() => handleRoleSelection("candidate")}
            >
              Continue as Candidate
            </Button>
          </div>
        </div>

        {/* Recruiter Card */}
        <div
          className="group bg-card border border-primary/20 rounded-xl p-8 cursor-pointer transition-all hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20"
          onClick={() => handleRoleSelection("recruiter")}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-lg mx-auto group-hover:bg-primary/30 transition-colors">
              <Users size={32} className="text-primary" />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Recruiter</h3>
              <p className="text-muted-foreground text-sm">
                Post jobs and find the perfect candidates
              </p>
            </div>
            <Button
              className="w-full"
              variant="neon"
              onClick={() => handleRoleSelection("recruiter")}
            >
              Continue as Recruiter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
