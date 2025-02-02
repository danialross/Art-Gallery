"use client";
import Art from "@/components/Art";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArtworks } from "@/utils/apiUtils";
import { Artwork } from "@/types";

type GalleryProps = {
  galleryArtworks: Artwork[];
  page: number;
};

export default function Gallery({ galleryArtworks, page }: GalleryProps) {
  const [imageWidth, setImageWidth] = useState(200);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>(galleryArtworks);

  const {
    data,
    isSuccess: isSuccessQueryArtworks,
    isLoading: isLoadingQueryArtworks,
  } = useQuery({
    queryKey: ["gallery", page],
    queryFn: () => getArtworks(9, page, false),
    enabled: page !== 1,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    // Add an event listener for window resize
    const resizeGalleryImages = () => {
      if (galleryRef.current) {
        setImageWidth(galleryRef.current.offsetWidth / 3 - 16);
      }
    };
    resizeGalleryImages();
    window.addEventListener("resize", resizeGalleryImages);
    return () => window.removeEventListener("resize", resizeGalleryImages);
  }, []);

  useEffect(() => {
    if (isSuccessQueryArtworks) {
      setArtworks(data);
    }
  }, [isSuccessQueryArtworks]);

  return (
    <div className={"relative "}>
      {isLoadingQueryArtworks && (
        <div className={"absolute w-full h-full backdrop-blur"} />
      )}
      <div
        className={"flex flex-wrap gap-4 justify-center my-8"}
        ref={galleryRef}
      >
        {artworks.map((artwork, index) => (
          <Art
            key={artwork ? `gallery-${artwork.id}` : index}
            id={artwork?.id ? artwork.id : -1}
            image_id={artwork ? artwork.image_id : ""}
            height={imageWidth}
            width={imageWidth}
            isNavigate={true}
          />
        ))}
      </div>
    </div>
  );
}
