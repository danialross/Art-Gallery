"use client";
import { useEffect, useState } from "react";
import { PiImagesThin } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

import Link from "next/link";

type TopbarProps = {
  children: React.ReactNode;
};

const Topbar = ({ children }: TopbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const openDropdown = () => {
    setIsDropdownOpen(true);
  };

  return (
    <>
      <div
        className={
          "relative w-screen h-[70px] bg-primary flex justify-between items-center px-mobileXAxis sm:px-xAxis"
        }
      >
        <Link
          href={"/"}
          className={
            "flex w-fit items-center gap-4 font-bold hover:opacity-40 fadeInOut"
          }
        >
          <div className={"h-[42px] w-[42px} sm:h-[58px] sm:w-[58px] "}>
            <PiImagesThin className={"text-black w-full h-full "} />
          </div>
          Agora
        </Link>
        <div
          className={
            " text-medium hidden sm:w-[500px] sm:flex sm:justify-evenly"
          }
        >
          <Link href="/gallery" className={"hover:opacity-40 fadeInOut"}>
            Gallery
          </Link>
          <Link href="/search" className={"hover:opacity-40 fadeInOut"}>
            Search
          </Link>
          <Link href="/About" className={"hover:opacity-40 fadeInOut"}>
            About
          </Link>
        </div>
        <button
          className={"sm:hidden hover:opacity-40 fadeInOut"}
          onClick={openDropdown}
        >
          <GiHamburgerMenu size="32px" />
        </button>
        <div
          className={`absolute bg-white w-screen transition-transform duration-200 ease-in-out top-0 right-0 ${isDropdownOpen ? "translate-x-0" : "translate-x-full"} right-0 h-64 flex justify-center`}
        >
          <div
            className={"w-4/5 h-full flex flex-col justify-evenly  text-end"}
          >
            <button
              className={"w-full flex justify-end"}
              onClick={closeDropdown}
            >
              <IoMdClose size={24} />
            </button>
            <Link href="/gallery" className={"hover:opacity-40 fadeInOut"}>
              Gallery
            </Link>
            <Link href="/search" className={"hover:opacity-40 fadeInOut"}>
              Search
            </Link>
            <Link href="/About" className={"hover:opacity-40 fadeInOut"}>
              About
            </Link>
          </div>
        </div>
      </div>
      {children}
    </>
  );
};

export default Topbar;
