"use client";
import { Artwork } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Art from "@/components/Art";
import { useEffect, useRef, useState } from "react";

type featuredArtworkProps = {
  artworks: Artwork[];
};

const FeaturedArtworks = ({ artworks }: featuredArtworkProps) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [featureImageWidth, setFeatureImageWidth] = useState(200);

  useEffect(() => {
    // Add an event listener for window resize
    const resizeCarouselImages = () => {
      if (carouselRef.current) {
        const currentCarouselSize = carouselRef.current.offsetWidth;
        const newWidth =
          currentCarouselSize < 768
            ? currentCarouselSize
            : currentCarouselSize / 3 - 16;
        const maxWidth = 400;
        if (newWidth > maxWidth) {
          setFeatureImageWidth(maxWidth);
        } else {
          setFeatureImageWidth(newWidth);
        }
      }
    };
    resizeCarouselImages();
    window.addEventListener("resize", resizeCarouselImages);
    return () => window.removeEventListener("resize", resizeCarouselImages);
  }, []);

  return (
    <>
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
            {artworks.map((artwork: Artwork | null, index: number) => (
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
    </>
  );
};

export default FeaturedArtworks;
