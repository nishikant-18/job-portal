/* eslint-disable react/prop-types */
import { Heart, MapPinIcon, Trash2Icon, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const JobCard = ({
  job,
  savedInit = false,
  onJobAction = () => {},
  isMyJob = false,
}) => {
  const [saved, setSaved] = useState(savedInit);

  const { user } = useUser();

  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const {
    loading: loadingSavedJob,
    data: savedJob,
    fn: fnSavedJob,
  } = useFetch(saveJob);

  const handleSaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobAction();
  };

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobAction();
  };

  useEffect(() => {
    if (savedJob !== undefined) setSaved(savedJob?.length > 0);
  }, [savedJob]);

  return (
    <Card className="flex flex-col group hover:neon-border">
      {loadingDeleteJob && (
        <BarLoader className="mt-4" width={"100%"} color="#6366F1" />
      )}
      <CardHeader className="flex">
        <CardTitle className="flex justify-between font-bold text-foreground">
          <div className="flex items-center gap-2">
            <Briefcase size={20} className="text-primary" />
            {job.title}
          </div>
          {isMyJob && (
            <Trash2Icon
              fill="currentColor"
              size={18}
              className="text-destructive cursor-pointer hover:text-destructive/80 transition-colors"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-center">
          {job.company && (
            <img src={job.company.logo_url} className="h-6 rounded-md" />
          )}
          <div className="flex gap-2 items-center text-sm text-muted-foreground">
            <MapPinIcon size={15} className="text-primary/70" />
            <span>{job.location}</span>
          </div>
        </div>
        <div className="border-t border-primary/10 pt-3 text-sm text-muted-foreground">
          {job.description.substring(0, job.description.indexOf("."))}.
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full hover:bg-secondary/90">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-12"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart
                size={20}
                fill="currentColor"
                stroke="currentColor"
                className="text-primary"
              />
            ) : (
              <Heart
                size={20}
                className="text-muted-foreground hover:text-primary transition-colors"
              />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
