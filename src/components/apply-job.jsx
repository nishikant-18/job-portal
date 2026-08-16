/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplication";
import { BarLoader } from "react-spinners";
import { FileUp, Send } from "lucide-react";

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" },
    ),
});

export function ApplyJobDrawer({ user, job, fetchJob, applied = false }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      fetchJob();
      reset();
    });
  };

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !applied ? "neon" : "outline"}
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen
            ? applied
              ? "✓ Applied"
              : "Apply Now"
            : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Apply for {job?.title}</DrawerTitle>
          <DrawerDescription className="text-base">
            at{" "}
            <span className="font-semibold text-foreground">
              {job?.company?.name}
            </span>
          </DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-4 pb-0"
        >
          {loadingApply && <BarLoader color="#6366F1" />}

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              placeholder="e.g., 5"
              className="flex-1"
              {...register("experience", {
                valueAsNumber: true,
              })}
            />
            {errors.experience && (
              <p className="text-destructive text-sm">
                {errors.experience.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              type="text"
              placeholder="React, Node.js, TypeScript..."
              className="flex-1"
              {...register("skills")}
            />
            {errors.skills && (
              <p className="text-destructive text-sm">
                {errors.skills.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label>Education Level</Label>
            <Controller
              name="education"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  {...field}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 p-2 rounded hover:bg-primary/10 transition-colors">
                    <RadioGroupItem
                      value="Intermediate"
                      id="intermediate"
                      className="border-primary"
                    />
                    <Label
                      htmlFor="intermediate"
                      className="cursor-pointer flex-1"
                    >
                      Intermediate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded hover:bg-primary/10 transition-colors">
                    <RadioGroupItem
                      value="Graduate"
                      id="graduate"
                      className="border-primary"
                    />
                    <Label htmlFor="graduate" className="cursor-pointer flex-1">
                      Graduate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded hover:bg-primary/10 transition-colors">
                    <RadioGroupItem
                      value="Post Graduate"
                      id="post-graduate"
                      className="border-primary"
                    />
                    <Label
                      htmlFor="post-graduate"
                      className="cursor-pointer flex-1"
                    >
                      Post Graduate
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.education && (
              <p className="text-destructive text-sm">
                {errors.education.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="resume">Resume (PDF or Word)</Label>
            <div className="relative">
              <Input
                id="resume"
                type="file"
                accept=".pdf, .doc, .docx"
                className="flex-1 file:text-primary file:font-semibold cursor-pointer"
                {...register("resume")}
              />
              <FileUp
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                size={18}
              />
            </div>
            {errors.resume && (
              <p className="text-destructive text-sm">
                {errors.resume.message}
              </p>
            )}
          </div>

          {errorApply?.message && (
            <p className="text-destructive bg-destructive/10 p-3 rounded-lg text-sm">
              {errorApply?.message}
            </p>
          )}

          <DrawerFooter>
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit" variant="neon" disabled={loadingApply}>
              <Send size={18} className="mr-2" />
              Submit Application
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
