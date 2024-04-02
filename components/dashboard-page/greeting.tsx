import React from "react";
type GreetingProps = {
  children?: React.ReactNode;
};

const Greeting = ({ children }: GreetingProps) => {
  return <h2 className="text-primary font-serif text-xl">{children}</h2>;
};

export default Greeting;
