"use client";
import Art from "@/components/Art";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Artwork } from "@/types";
import { getGalleryArtworks } from "@/utils/queryUtils";

type GalleryProps = {
  galleryArtworks: Artwork[];
  page: number;
};

export default function Gallery({ galleryArtworks, page }: GalleryProps) {
  const [imageWidth, setImageWidth] = useState(200);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>(galleryArtworks);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const {
    data,
    isSuccess: isSuccessQueryArtworks,
    isLoading: isLoadingQueryArtworks,
  } = getGalleryArtworks(page, isQueryEnabled);
  useLayoutEffect(() => {
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
  }, [isSuccessQueryArtworks, data]);

  useEffect(() => {
    if (page != 1) {
      setIsQueryEnabled(true);
    }
  }, [page]);

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
