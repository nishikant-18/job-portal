import { getCompanies } from "@/api/apiCompanies";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/add-company-drawer";
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
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import MDEditor from "@uiw/react-md-editor";
import { State } from "country-state-city";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";
import { MapPin, Building2, CheckCircle } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { location: "", company_id: "", requirements: "" },
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingCreateJob,
    error: errorCreateJob,
    data: dataCreateJob,
    fn: fnCreateJob,
  } = useFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  useEffect(() => {
    if (dataCreateJob?.length > 0) navigate("/jobs");
  }, [loadingCreateJob]);

  const {
    loading: loadingCompanies,
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className="mb-4" width={"100%"} color="#6366F1" />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="gradient-title font-extrabold text-5xl sm:text-6xl lg:text-7xl">
          Post a New Job
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Find the perfect candidate for your team. Fill in the details below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto space-y-6 bg-card border border-primary/20 p-8 rounded-xl"
      >
        {/* Basic Info Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CheckCircle size={20} className="text-primary" />
            Job Details
          </h2>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Job Title
            </label>
            <Input
              placeholder="e.g., Senior React Developer"
              {...register("title")}
              className="text-base"
            />
            {errors.title && (
              <p className="text-destructive text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              placeholder="Tell us about the role, responsibilities, and what makes this position unique..."
              {...register("description")}
              className="text-base min-h-[120px]"
            />
            {errors.description && (
              <p className="text-destructive text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Location & Company Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Building2 size={20} className="text-primary" />
            Company & Location
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                <MapPin size={16} />
                Job Location
              </label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {State.getStatesOfCountry("IN").map(({ name }) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location && (
                <p className="text-destructive text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-1">
                <Building2 size={16} />
                Company
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Controller
                    name="company_id"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company">
                            {field.value
                              ? companies?.find(
                                  (com) => com.id === Number(field.value),
                                )?.name
                              : "Select company"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {companies?.map(({ name, id }) => (
                              <SelectItem key={name} value={id}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <AddCompanyDrawer fetchCompanies={fnCompanies} />
              </div>
              {errors.company_id && (
                <p className="text-destructive text-sm">
                  {errors.company_id.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Requirements</h2>
          <p className="text-sm text-muted-foreground">
            Use markdown to format your requirements. Include skills,
            experience, and qualifications.
          </p>
          <Controller
            name="requirements"
            control={control}
            render={({ field }) => (
              <div className="border border-primary/20 rounded-lg overflow-hidden">
                <MDEditor
                  value={field.value}
                  onChange={field.onChange}
                  height={300}
                  preview="edit"
                  hideToolbar={false}
                />
              </div>
            )}
          />
          {errors.requirements && (
            <p className="text-destructive text-sm">
              {errors.requirements.message}
            </p>
          )}
        </div>

        {/* Error Messages */}
        {errors.errorCreateJob && (
          <div className="bg-destructive/10 border border-destructive/50 p-4 rounded-lg">
            <p className="text-destructive text-sm">
              {errors?.errorCreateJob?.message}
            </p>
          </div>
        )}
        {errorCreateJob?.message && (
          <div className="bg-destructive/10 border border-destructive/50 p-4 rounded-lg">
            <p className="text-destructive text-sm">
              {errorCreateJob?.message}
            </p>
          </div>
        )}

        {loadingCreateJob && <BarLoader width={"100%"} color="#6366F1" />}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="neon"
          size="lg"
          className="w-full"
          disabled={loadingCreateJob}
        >
          {loadingCreateJob ? "Posting..." : "Post Job"}
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
