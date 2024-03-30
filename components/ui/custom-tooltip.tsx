import { TooltipProps } from "@radix-ui/react-tooltip";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

type CustomToolTipProps = TooltipProps & {
  content: string;
  delay?: number;
};

const CustomToolTip = ({
  content,
  delay = 1,
  ...props
}: CustomToolTipProps) => {
  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip {...props}>
        <TooltipTrigger>{props.children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CustomToolTip;
