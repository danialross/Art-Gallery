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
  const [artworks, setArtworks] = useState<Artwork[] | null[]>(galleryArtworks);

  const {
    data = [null, null, null, null, null, null, null, null, null],
    isSuccess: isSuccessQueryArtworks,
  } = useQuery({
    queryKey: ["gallery", page],
    queryFn: () => getArtworks(9, page, false),
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
    setArtworks(data);
  }, [isSuccessQueryArtworks]);

  return (
    <>
      <div
        className={"flex flex-wrap gap-4 justify-center my-8"}
        ref={galleryRef}
      >
        {artworks.map((artwork, index) => (
          <Art
            key={artwork ? `gallery-${artwork.id}` : index}
            image_id={artwork ? artwork.image_id : ""}
            height={imageWidth}
            width={imageWidth}
          />
        ))}
      </div>
    </>
  );
}
