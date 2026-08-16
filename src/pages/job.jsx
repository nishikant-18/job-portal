import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  Briefcase,
  DoorClosed,
  DoorOpen,
  MapPinIcon,
  Users,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApplyJobDrawer } from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";

import useFetch from "@/hooks/use-fetch";
import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";

const JobPage = () => {
  const { id } = useParams();
  const { isLoaded, user } = useUser();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) fnJob();
  }, [isLoaded]);

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateHiringStatus,
    {
      job_id: id,
    },
  );

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob());
  };

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366F1" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-start md:items-center bg-card border border-primary/20 p-6 rounded-xl">
        <div className="flex-1">
          <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
            {job?.title}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {job?.company?.name}
          </p>
        </div>
        <img
          src={job?.company?.logo_url}
          className="h-12 sm:h-16 rounded-lg"
          alt={job?.title}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-primary/20 p-4 rounded-lg flex items-center gap-3">
          <MapPinIcon className="text-primary" size={20} />
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="font-semibold">{job?.location}</p>
          </div>
        </div>
        <div className="bg-card border border-primary/20 p-4 rounded-lg flex items-center gap-3">
          <Users className="text-primary" size={20} />
          <div>
            <p className="text-xs text-muted-foreground">Applicants</p>
            <p className="font-semibold">{job?.applications?.length}</p>
          </div>
        </div>
        <div className="bg-card border border-primary/20 p-4 rounded-lg flex items-center gap-3">
          {job?.isOpen ? (
            <>
              <DoorOpen className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-semibold text-primary">Open</p>
              </div>
            </>
          ) : (
            <>
              <DoorClosed className="text-destructive" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-semibold text-destructive">Closed</p>
              </div>
            </>
          )}
        </div>
      </div>

      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full font-semibold ${job?.isOpen ? "bg-primary/20 border-primary/50" : "bg-destructive/20 border-destructive/50"}`}
          >
            <SelectValue
              placeholder={
                "Hiring Status " + (job?.isOpen ? "( Open )" : "( Closed )")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      )}

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">About the job</h2>
          <p className="sm:text-lg text-muted-foreground leading-relaxed">
            {job?.description}
          </p>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            What we are looking for
          </h2>
          <MDEditor.Markdown
            source={job?.requirements}
            className="bg-transparent sm:text-lg text-muted-foreground"
          />
        </div>
      </div>

      {job?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={job}
          user={user}
          fetchJob={fnJob}
          applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
        />
      )}
      {loadingHiringStatus && <BarLoader width={"100%"} color="#6366F1" />}
      {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl">Applications</h2>
          <div className="grid gap-4">
            {job?.applications.map((application) => {
              return (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPage;
