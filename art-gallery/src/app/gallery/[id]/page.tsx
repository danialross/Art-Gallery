"use client";
import SingleArtwork from "@/components/SingleArtwork";
import { useParams } from "next/navigation";
import { getArtwork } from "@/utils/queryUtils";
import { emptyArtwork } from "@/utils/utils";

export default function ArtworkPage() {
  const { id } = useParams<{ id: string }>();
  const { data: artwork = emptyArtwork } = getArtwork(id);
  return (
    <div className={`minDimensions bg-background xPadding yPadding`}>
      <SingleArtwork artwork={artwork} />
    </div>
  );
}
