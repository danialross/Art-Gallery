"use client";
import React from "react";
import { PiImagesThin } from "react-icons/pi";
import Link from "next/link";

type TopbarProps = {
  children: React.ReactNode;
};

const Topbar = ({ children }: TopbarProps) => {
  return (
    <>
      <div
        className={
          "w-screen h-[120px] bg-primary flex justify-between items-center px-xAxis"
        }
      >
        <Link href={"/"} className={" hover:opacity-40 fadeInOut"}>
          <PiImagesThin size={"80px"} className={"text-black"} />
        </Link>
        <div className={"flex gap-24"}>
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
      {children}
    </>
  );
};

export default Topbar;
