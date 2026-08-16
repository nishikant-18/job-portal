/* eslint-disable react/prop-types */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/40 hover:shadow-xl hover:shadow-primary/60",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/30",
        outline:
          "border border-primary/30 bg-background hover:bg-primary/10 hover:border-primary/60 text-foreground hover:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 border border-primary/20",
        ghost:
          "hover:bg-primary/10 hover:text-primary text-foreground transition-colors",
        link: "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
        blue: "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/40",
        neon: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/40",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-lg px-8",
        icon: "h-10 w-10",
        xl: "h-14 sm:h-16 rounded-lg px-14 text-lg sm:text-xl font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
