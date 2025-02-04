"use client";
import { getArtworkUsingId } from "@/utils/apiUtils";
import SingleArtwork from "@/components/SingleArtwork";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Artwork } from "@/types";

export default function ArtworkPage() {
  const { id } = useParams<{ id: string }>();
  const emptyArtwork: Artwork = {
    artist_title: "",
    date_display: "",
    description: "",
    id: -1,
    image_id: null,
    place_of_origin: "",
    title: "",
  };

  const { data: artwork = emptyArtwork } = useQuery({
    queryKey: ["artwork", id],
    queryFn: () => getArtworkUsingId(id),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 2,
  });
  // const artwork = await getArtworkUsingId(id);
  return (
    <div className={`minDimensions bg-background xPadding yPadding`}>
      <SingleArtwork artwork={artwork} />
    </div>
  );
}
