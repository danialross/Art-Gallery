"use client";
import { ReactNode, useState } from "react";
import { PiImagesThin } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import Link from "next/link";

type TopbarProps = {
  children: ReactNode;
};

const Topbar = ({ children }: TopbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <div className={"relative overflow-x-hidden"}>
      <div
        className={
          "h-[70px] w-screen min-w-minWidth xPadding overflow-x-hidden bg-primary flex justify-between items-center"
        }
      >
        <Link
          href={"/"}
          className={
            "flex w-fit items-center gap-4 font-bold hover:opacity-40 fadeInOut"
          }
        >
          <div className={"h-[48px] w-[48px]"}>
            <PiImagesThin className={"text-black w-full h-full scale-125 "} />
          </div>
          Agora
        </Link>
        <div className={"text-medium hidden sm:w-[500px] sm:flex"}>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={"hover:opacity-40 fadeInOut ml-auto"}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <button
          className={"sm:hidden hover:opacity-40 fadeInOut"}
          onClick={openDropdown}
        >
          <GiHamburgerMenu size="32px" />
        </button>
      </div>
      {/*Modal*/}
      <div
        className={`absolute bg-white w-screen min-w-minWidth sm:hidden  flex justify-center transition-transform duration-200 ease-in-out top-0 right-0 ${isDropdownOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className={"w-4/5 h-64 flex flex-col justify-evenly text-end"}>
          <button className={"w-full flex justify-end"} onClick={closeDropdown}>
            <IoMdClose size={24} />
          </button>
          <Link
            href="/gallery"
            className={"hover:opacity-40 fadeInOut"}
            onClick={closeDropdown}
          >
            Gallery
          </Link>
          <Link
            href="/search"
            className={"hover:opacity-40 fadeInOut"}
            onClick={closeDropdown}
          >
            Search
          </Link>
          <Link
            href="/about"
            className={"hover:opacity-40 fadeInOut"}
            onClick={closeDropdown}
          >
            About
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Topbar;
