"use client";
import { ArrowRightIcon, BotIcon, FolderIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const sidebarDashboardLinks = [
  {
    label: "Chats",
    href: "/chat",
    icon: React.createElement(BotIcon),
  },
  {
    label: "Notes",
    href: "/folders",
    icon: React.createElement(FolderIcon),
  },
];

type SidebarDashboardProps = {
  mostRecentChatId: string;
};

const SidebarDashboard = ({ mostRecentChatId }: SidebarDashboardProps) => {
  return (
    <>
      <ul className="flex flex-col gap-y-4">
        {sidebarDashboardLinks.map((link, index) => {
          if (link.label === "Chats" && mostRecentChatId) {
            link.href = `/chat/${mostRecentChatId}`;
          }
          return (
            <li key={index}>
              <Link href={link.href}>
                <Button
                  variant="ghost"
                  className="w-full inline-flex items-center justify-evenly group transition-all"
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-150">
                    <ArrowRightIcon />
                  </span>
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default SidebarDashboard;
