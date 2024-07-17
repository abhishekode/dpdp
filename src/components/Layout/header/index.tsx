"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { ModeToggle } from "../Theme";
import { useGlobalUser } from "@/components/context/UserContext";
import { LogOutIcon } from 'lucide-react'
import Image from "next/image";
const Header = () => {
  const { user, setUser } = useGlobalUser();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About", path: "/about" },
    ...(user
      ? user.role === "student"
        ? [{ id: 6, name: "Student", path: "/student" }]
        : user.role === "admin"
          ? [{ id: 4, name: "Admin", path: "/admin" }]
          : []
      : []),
  ];

  const handleLogout = () => {
    deleteCookie("user");
    setUser(null);
  };

  if (pathname.match(/^\/admin(\/.*)?$/)) {
    return null;
  }

  return (
    <div className={`${isScrolled ? "bg-slate-950 text-gray-50 sticky top-0" : "bg-slate-50 text-gray-950"} z-50 shadow-md border-b`}>
      <div className="container md:mx-auto mx-2 ">
        <div className="py-5 px-2 flex justify-between items-center w-full rounded-md">
          <div className="cursor-pointer">
            <Link href="/" className="text-lg font-bold">
              <Image src={'/logo.png'} alt="dp-dp-logo" height={100} width={100} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
