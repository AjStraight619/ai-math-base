"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

const MobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <Button
        className="fixed top-2 right-3 z-[999]"
        onClick={handleMenuToggle}
        size="icon"
        variant="outline"
      >
        <MenuIcon />
      </Button>
      {isMobileMenuOpen && (
        <nav className="sm:hidden block h-screen w-full bg-black fixed top-0 left-0 z-10">
          MobileMenu
        </nav>
      )}
    </>
  );
};

export default MobileMenu;
