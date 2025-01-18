"use client";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedArtworks, getLatestArtworks } from "@/utils/apiUtils";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
} from "@/components/ui/carousel";
import { Artwork } from "@/types";
import Art from "@/components/Art";
import NewlyAddedArt from "@/components/NewlyAddedArt";
import { processNullValues } from "@/utils/utils";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [featureImageWidth, setFeatureImageWidth] = useState(0);
  const { data: latestArtworks = [null, null, null, null, null] } = useQuery({
    queryKey: ["latestArtwork"],
    queryFn: () => getLatestArtworks(5),
    select: processNullValues,
  });

  const { data: featuredArtworks = [null, null, null, null, null, null] } =
    useQuery({
      queryKey: ["featuredArtwork"],
      queryFn: getFeaturedArtworks,
      select: processNullValues,
    });

  useEffect(() => {
    // Add an event listener for window resize
    const setGalleryWidth = () => {
      if (carouselRef.current) {
        const newWidth = carouselRef.current.offsetWidth / 3 - 16;
        const maxWidth = 400;
        if (newWidth > maxWidth) {
          setFeatureImageWidth(maxWidth);
        } else {
          setFeatureImageWidth(newWidth);
        }
      }
    };
    setGalleryWidth();
    window.addEventListener("resize", setGalleryWidth);
    return () => window.removeEventListener("resize", setGalleryWidth);
  }, []);

  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <h1 className={"text-large font-bold"}>Featured Artwork</h1>
      <p>
        Explore our handpicked selection of the most captivating and
        talked-about pieces.
      </p>
      <div className={"flex justify-center pb-12"}>
        <Carousel
          className={"w-[250px] md:w-full"}
          opts={{ loop: true }}
          ref={carouselRef}
        >
          <CarouselPrevious />
          <CarouselContent className={"py-8 "}>
            {featuredArtworks.map((artwork: Artwork | null, index: number) => (
              <CarouselItem
                className={
                  "basis-1/1 md:basis-1/3 relative flex justify-center items-center "
                }
                key={`featured-array-${index}`}
              >
                {/*use loading from within art because art need to process one more step before showing image*/}
                {/*using useQuery isLoading causes the image to flash to another loading state before showing image*/}
                <Art
                  image_id={artwork ? artwork.image_id : ""}
                  width={featureImageWidth}
                  height={featureImageWidth}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
      <h1 className={"text-large font-bold"}>Newly Added</h1>
      <p>Freshly arrived and ready to inspire.</p>
      <div className={"py-8 space-y-16"}>
        {latestArtworks.map((artwork: Artwork | null, index: number) => (
          <NewlyAddedArt
            key={`latest-array-${index}`}
            title={artwork ? artwork.title : ""}
            artist_title={artwork ? artwork.artist_title : ""}
            description={artwork ? artwork.description : ""}
            place_of_origin={artwork ? artwork.place_of_origin : ""}
            date_display={artwork ? artwork.date_display : ""}
            image_id={artwork ? artwork.image_id : ""}
          />
        ))}
      </div>
    </div>
  );
}
