"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getLatestArtworks } from "@/utils/apiUtils";

export default function Home() {
  const { isError, isLoading, data } = useQuery({
    queryKey: ["artworks"],
    queryFn: getLatestArtworks,
  });

  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>home</div>
  );
}
