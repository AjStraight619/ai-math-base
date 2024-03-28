import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Socials = () => {
  return (
    <div className="flex flex-row gap-2 mt-4">
      <Button variant="outline" size="lg" className="w-full">
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button variant="outline" size="lg" className="w-full">
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Socials;
