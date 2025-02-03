"use client";
import { ReactNode, useState } from "react";
import { PiImagesThin } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import Link from "next/link";
import { Progress } from "@/components/ui/progress";

type TopbarProps = {
  children: ReactNode;
};

const Topbar = ({ children }: TopbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState("/");

  const links = [
    { href: "/gallery", label: "Gallery" },
    { href: "/search", label: "Search" },
    { href: "/about", label: "About" },
  ];

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  const timer = () => {
    setTimeout(() => setProgress(23), 400);
    setTimeout(() => setProgress(67), 1000);
    setTimeout(() => setProgress(100), 1500);
  };

  const handleProgressAnimation = (nextRoute: string) => {
    if (nextRoute !== currentPage) {
      timer();
      setCurrentPage(nextRoute);
    }
  };

  return (
    <div className={"relative overflow-x-hidden"}>
      <div
        className={
          "h-[80px] w-full min-w-minWidth xPadding overflow-x-hidden bg-primary flex justify-between items-center"
        }
      >
        <Link
          href={"/"}
          className={
            "flex  items-center gap-4 font-bold hover:opacity-hover-effect hover-effect"
          }
          onClick={() => handleProgressAnimation("/")}
        >
          <div className={"h-[48px] w-[48px]"}>
            <PiImagesThin className={"text-black w-full h-full scale-125 "} />
          </div>
          The Agora
        </Link>
        <div className={"text-medium hidden sm:w-[500px] sm:flex "}>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={"hover:opacity-hover-effect hover-effect ml-auto"}
              onClick={() => handleProgressAnimation(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className={"sm:hidden hover:opacity-hover-effect fadeInOut"}
          onClick={openDropdown}
        >
          <GiHamburgerMenu size="32px" />
        </button>
      </div>
      {/*Modal*/}
      <div
        className={`absolute z-50 bg-white w-screen min-w-minWidth sm:hidden  flex justify-center transition-transform duration-200 ease-in-out top-0 right-0 ${isDropdownOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className={"w-4/5 h-64 flex flex-col justify-evenly items-end"}>
          <button className={"flex justify-end w-fit"} onClick={closeDropdown}>
            <IoMdClose size={24} />
          </button>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={"hover:opacity-40 fadeInOut w-fit"}
              onClick={() => {
                closeDropdown();
                handleProgressAnimation(link.href);
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <Progress value={progress} />
      {children}
    </div>
  );
};

export default Topbar;
