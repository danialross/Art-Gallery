"use client";
import { getArtworkByImageId } from "@/utils/apiUtils";
import ArtWithDetails from "@/components/ArtWithDetails";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function ArtworkPage() {
  const { image_id } = useParams<{ image_id: string }>();

  const { data: artwork = [], isLoading: isLoadingArtwork } = useQuery({
    queryKey: [image_id],
    queryFn: () => getArtworkByImageId(image_id),
    select: (artwork) => (artwork ? [artwork] : []),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 2,
  });
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  if (isLoadingArtwork) {
    <></>;
  }
  if (!artwork) {
    return <p>The resources does not exist!</p>;
  }

  return (
    <div
      className={`minDimensions bg-background xPadding yPadding fade-in ${startAnimation ? "opacity-100" : "opacity-0"}`}
    >
      <button className={"icon-grow-effect"}>
        <FaArrowLeftLong size={30} />
      </button>
      <ArtWithDetails artworks={artwork} />
    </div>
  );
}
