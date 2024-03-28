"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SidebarPresenceContextType = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SidebarPresenceContext = createContext<SidebarPresenceContextType>(
  {
    isSidebarOpen: false,
    setIsSidebarOpen: () => {},
  }
);

const SidebarPresenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarPresenceContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen }}
    >
      {children}
    </SidebarPresenceContext.Provider>
  );
};

export default SidebarPresenceProvider;

export const useSidebarContext = () => {
  const context = useContext(SidebarPresenceContext);
  if (!context) {
    throw new Error(
      "useSidebarContext must be used within a SidebarPresenceProvider"
    );
  }
  return context;
};
