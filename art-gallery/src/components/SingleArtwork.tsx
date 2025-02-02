"use client";
import ArtWithDetails from "@/components/ArtWithDetails";
import { Artwork } from "@/types";
import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";

type SingleArtworkProps = {
  artwork: Artwork | null;
};

export default function SingleArtwork({ artwork }: SingleArtworkProps) {
  const [startAnimation, setStartAnimation] = useState(false);
  const [singleArtworkArray, setSingleArtworkArray] = useState<Artwork[]>([]);

  useEffect(() => {
    setStartAnimation(true);
    if (artwork) {
      setSingleArtworkArray([artwork]);
    }
  }, []);

  return (
    <div className={`fade-in ${startAnimation ? "opacity-100" : "opacity-0"}`}>
      <BackButton />
      {artwork ? (
        <ArtWithDetails artworks={singleArtworkArray} />
      ) : (
        <p>The resources does not exist.</p>
      )}
    </div>
  );
}
