/* eslint-disable react/prop-types */
import {
  Boxes,
  BriefcaseBusiness,
  Download,
  School,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateApplicationStatus } from "@/api/apiApplication";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationStatus,
    {
      job_id: application.job_id,
    },
  );

  const handleStatusChange = (status) => {
    fnHiringStatus(status).then(() => fnHiringStatus());
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "hired":
        return "bg-primary/20 text-primary border-primary/50";
      case "rejected":
        return "bg-destructive/20 text-destructive border-destructive/50";
      case "interviewing":
        return "bg-purple-500/20 text-purple-300 border-purple-500/50";
      default:
        return "bg-muted/50 text-muted-foreground border-muted/50";
    }
  };

  return (
    <Card className="border-primary/20">
      {loadingHiringStatus && <BarLoader width={"100%"} color="#6366F1" />}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold items-start gap-4">
          <div className="flex-1">
            {isCandidate
              ? `${application?.job?.title} at ${application?.job?.company?.name}`
              : application?.name}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="shrink-0"
          >
            <Download size={16} className="mr-1" />
            Resume
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="flex gap-2 items-center bg-secondary p-2 rounded-lg">
            <BriefcaseBusiness size={16} className="text-primary" />
            <span className="text-muted-foreground">
              {application?.experience} yrs
            </span>
          </div>
          <div className="flex gap-2 items-center bg-secondary p-2 rounded-lg">
            <School size={16} className="text-primary" />
            <span className="text-muted-foreground text-xs">
              {application?.education}
            </span>
          </div>
          <div className="flex gap-2 items-center bg-secondary p-2 rounded-lg">
            <Boxes size={16} className="text-primary" />
            <span className="text-muted-foreground truncate text-xs">
              {application?.skills}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center gap-4 pt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar size={14} />
          {new Date(application?.created_at).toLocaleDateString()}
        </div>
        {isCandidate ? (
          <span
            className={`capitalize font-semibold px-3 py-1 rounded-full text-xs border ${getStatusColor(application.status)}`}
          >
            {application.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
