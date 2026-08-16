/* eslint-disable react/prop-types */
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { addNewCompany } from "@/api/apiCompanies";
import { BarLoader } from "react-spinners";
import { useEffect } from "react";
import { Upload } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "image/png" || file[0].type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      },
    ),
});

const AddCompanyDrawer = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
    fn: fnAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = async (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    });
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) {
      fetchCompanies();
    }
  }, [loadingAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" size="sm" variant="neon">
          + Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a New Company</DrawerTitle>
        </DrawerHeader>
        <form className="space-y-6 p-4 pb-0">
          {/* Company Name */}
          <div className="space-y-2">
            <label
              htmlFor="company-name"
              className="text-sm font-medium text-foreground"
            >
              Company Name
            </label>
            <Input
              id="company-name"
              placeholder="Enter company name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Company Logo */}
          <div className="space-y-2">
            <label
              htmlFor="company-logo"
              className="text-sm font-medium text-foreground flex items-center gap-2"
            >
              <Upload size={16} />
              Company Logo
            </label>
            <div className="relative">
              <Input
                id="company-logo"
                type="file"
                accept="image/*"
                className="file:text-primary/60"
                {...register("logo")}
              />
            </div>
            {errors.logo && (
              <p className="text-sm text-destructive">{errors.logo.message}</p>
            )}
          </div>

          {errorAddCompany?.message && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
              <p className="text-sm text-destructive">
                {errorAddCompany?.message}
              </p>
            </div>
          )}
        </form>

        <DrawerFooter>
          {loadingAddCompany && <BarLoader width={"100%"} color="#6366F1" />}
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="flex-1"
              disabled={loadingAddCompany}
            >
              {loadingAddCompany ? "Adding..." : "Add Company"}
            </Button>
            <DrawerClose asChild>
              <Button type="button" variant="outline" className="flex-1">
                Cancel
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddCompanyDrawer;
