"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user/user-avatar";
import { ChatMetaData } from "@/lib/types";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
} from "lucide-react";
import { useSidebarContext } from "@/context/sidebar-presence-context";
import SidebarDashboard from "@/components/dashboard-page/sidebar-dashboard";

type SidebarProps = {
  chatMetaData: ChatMetaData;
  session: Session | null;
};

const dropdownLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: React.createElement(LayoutDashboardIcon),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: React.createElement(SettingsIcon),
  },
  {
    label: "Sign Out",
    href: "/api/auth/signout",
    icon: React.createElement(LogOutIcon),
    separator: true,
  },
];

const sidebarVariants = {
  hidden: { x: "-100%" },
  show: { x: 0 },
};

const buttonVariants = {
  hidden: { left: 0 },
  show: { left: "12rem" },
};

const Sidebar = ({ chatMetaData, session }: SidebarProps) => {
  const pathname = usePathname();
  const mostRecentChatId = chatMetaData[0]?.id ?? "";

  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  const [isHovering, setIsHovering] = useState(false);
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // * If the user is on the home page, don't render the sidebar
  if (
    pathname === "/" ||
    pathname === "/register" ||
    pathname === "/login" ||
    pathname.includes("/settings") ||
    pathname.includes("/forgot-password")
  )
    return null;

  const isDashboardPath = pathname === "/dashboard";

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ type: "tween" }}
            className="fixed top-0 h-full  w-48 border-r border-muted-foreground bg-zinc-900 p-2"
          >
            <div className="flex flex-col items-center h-full">
              <div className="flex-1 w-full">
                {isDashboardPath && (
                  <SidebarDashboard mostRecentChatId={mostRecentChatId} />
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="w-full flex justify-evenly items-center py-2 hover:bg-gray-700/40 rounded-lg cursor-pointer">
                    <UserAvatar session={session} />
                    <span>{session?.user?.name}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2">
                  <ul className="space-y-4 w-full">
                    {dropdownLinks.map((link, index) => {
                      if (link.href === "/settings") {
                        link.href = `/settings/${session?.user?.id}`;
                      }
                      return (
                        <li className="w-full" key={index}>
                          {link.separator && (
                            <Separator className="w-full mb-2" />
                          )}
                          <Link
                            className="flex flex-row items-center gap-x-2 hover:bg-gray-700/40 rounded-lg p-2 w-full transition-colors duration-150"
                            href={link.href}
                          >
                            <span>{link.icon}</span>
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <motion.button
        onClick={handleSidebarToggle}
        className="fixed -translate-y-1/2 top-1/2 cursor-pointer z-[999]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        animate={isSidebarOpen ? "show" : "hidden"}
        variants={buttonVariants}
      >
        {isHovering ? (
          isSidebarOpen ? (
            <ChevronLeftIcon className="ml-2" />
          ) : (
            <ChevronRightIcon className="ml-2" />
          )
        ) : (
          <div className="w-[2px] h-6 rounded-md bg-gray-50 ml-4" />
        )}
      </motion.button>
    </>
  );
};

export default Sidebar;
