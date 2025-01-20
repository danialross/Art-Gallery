"use client";
import { useQuery } from "@tanstack/react-query";
import { getArtworkUsingQuery, getTotalArtworkPages } from "@/utils/apiUtils";
import Art from "@/components/Art";
import PaginationBar from "@/components/PaginationBar";
import { useEffect, useRef, useState } from "react";

const About = () => {
  const [page, setPage] = useState(1);
  const [imageWidth, setImageWidth] = useState(window.innerWidth / 4); // rough estimation of screen size
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const {
    data: artworks = [null, null, null, null, null, null, null, null, null],
  } = useQuery({
    queryKey: ["gallery", page],
    queryFn: () => getArtworkUsingQuery("", page, 9),
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

  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <h1 className={"text-large mb-4 w-full"}>Gallery</h1>
      <PaginationBar page={page} setPage={setPage} />
      <div
        className={" flex flex-wrap gap-4 justify-center my-8"}
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
      <PaginationBar page={page} setPage={setPage} />
    </div>
  );
};

export default About;
