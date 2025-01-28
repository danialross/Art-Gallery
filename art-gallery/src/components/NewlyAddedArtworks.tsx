"use client";
import { Artwork } from "@/types";
import ArtWithDetails from "@/components/ArtWithDetails";
import { useEffect, useState } from "react";

type NewlyAddedArtworksProps = {
  artworks: Artwork[];
};

export default function NewlyAddedArtworks({
  artworks,
}: NewlyAddedArtworksProps) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <div
      className={`space-y-8 ${startAnimation ? "opacity-100" : "opacity-0"}`}
    >
      <div>
        <h1 className={"text-large font-bold"}>Newly Added</h1>
        <p>Freshly arrived and ready to inspire.</p>
      </div>
      <ArtWithDetails artworks={artworks} />
    </div>
  );
}
