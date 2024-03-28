import { cn } from "@/lib/utils";
import React from "react";

type BgGradientProps = {
  children: React.ReactNode;
  className?: string;
};

const BgGradient = ({ className, children }: BgGradientProps) => {
  return (
    <div
      className={cn(
        "rounded-md p-[1px] bg-gradient-to-tr from-cyan-400 to-blue-400",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BgGradient;
