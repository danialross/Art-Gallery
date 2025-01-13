"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getLatestArtworks, getTotalArtworks } from "@/utils/apiUtils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Artwork } from "@/types";

export default function Home() {
  const {
    isError: isErrorLatestArtwork,
    isLoading: isLoadingLatestArtwork,
    data: latestArtwork,
  } = useQuery({
    queryKey: ["artworks"],
    queryFn: getLatestArtworks,
  });

  const {
    isError: isErrorFeaturedArtwork,
    isLoading: isLoadingFeaturedArtwork,
    data: featuredArtwork,
  } = useQuery({
    queryKey: ["totalNumArtwork"],
    queryFn: getTotalArtworks,
  });

  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <h1 className={"text-large font-bold"}>Featured Artwork</h1>
      <p>
        Explore our handpicked selection of the most captivating and
        talked-about pieces.
      </p>
      <div>
        <Carousel className={"py-8"}>
          <CarouselContent>
            {featuredArtwork.map((artwork: Artwork) => (
              <CarouselItem className={"basis-1/3"}>
                <Image
                  src={"/Art_Institute_of_Chicago_logo.png"}
                  alt={"first"}
                  width={300}
                  height={300}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
