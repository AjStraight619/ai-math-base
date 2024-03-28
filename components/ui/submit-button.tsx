import React from "react";
import { Button, ButtonProps } from "./button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SubmitButtonProps = ButtonProps & { isPending?: boolean };

const SubmitButton = ({ isPending, ...props }: SubmitButtonProps) => {
  return (
    <Button
      className={cn(props.className)}
      disabled={isPending}
      type="submit"
      {...props}
    >
      {isPending ? <Loader2 className="animate-spin" /> : props.children}
    </Button>
  );
};

export default SubmitButton;
