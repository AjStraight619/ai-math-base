import React from "react";
import { Button, ButtonProps } from "./button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = ButtonProps & { isPending?: boolean };

const SubmitButton = ({ isPending, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn(props.className)}
      disabled={isPending || pending}
      type="submit"
      {...props}
    >
      {isPending || pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        props.children
      )}
    </Button>
  );
};

export default SubmitButton;
