import React from "react";

type SectionDividerProps = {
  children?: React.ReactNode;
};

const SectionDivider = ({ children }: SectionDividerProps) => {
  return (
    <div className="items-center font-poppins text-secondary text-xl mb-8 mt-16">
      {children}
    </div>
  );
};

export default SectionDivider;
