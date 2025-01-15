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
import { useEffect, useState } from "react";
import { setUrlFromArtworks } from "@/utils/utils";
import Image from "next/image";
import LoadingImage from "@/components/LoadingImage";

export default function Home() {
  const [featuredArtworksUrls, setFeaturedArtworksUrls] = useState<string[]>(
    [],
  );
  const [latestArtworksUrls, setLatestArtworksUrls] = useState<string[]>([]);

  const { data: latestArtworks = [], isSuccess: isSuccessLatestArtworks } =
    useQuery({
      queryKey: ["latestArtwork"],
      queryFn: getLatestArtworks,
    });

  const { data: featuredArtworks = [], isSuccess: isSuccessFeaturedArtworks } =
    useQuery({
      queryKey: ["featuredArtwork"],
      queryFn: getFeaturedArtworks,
    });

  useEffect(() => {
    if (isSuccessFeaturedArtworks && featuredArtworks) {
      console.log(featuredArtworks);
      setUrlFromArtworks(featuredArtworks, setFeaturedArtworksUrls);
    }
  }, [isSuccessFeaturedArtworks, featuredArtworks]);

  useEffect(() => {
    if (isSuccessLatestArtworks && latestArtworks) {
      console.log(latestArtworks);
      setUrlFromArtworks(latestArtworks, setLatestArtworksUrls);
    }
  }, [setUrlFromArtworks, latestArtworks]);

  useEffect(() => {
    return () => {
      featuredArtworksUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      latestArtworksUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <h1 className={"text-large font-bold"}>Featured Artwork</h1>
      <p>
        Explore our handpicked selection of the most captivating and
        talked-about pieces.
      </p>
      <div className={"flex justify-center "}>
        <Carousel className={"py-8 w-[250px] sm:w-full"} opts={{ loop: true }}>
          <CarouselContent className={"-ml-10"}>
            {featuredArtworksUrls.length > 0
              ? featuredArtworksUrls.map((url: string) => (
                  <CarouselItem
                    className={
                      "basis-1/1 sm:basis-1/3 flex items-center pl-10 w-full"
                    }
                    key={url}
                  >
                    <Image
                      src={url}
                      alt={"artwork"}
                      height={500}
                      width={500}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </CarouselItem>
                ))
              : Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    className={"basis-1/1 sm:basis-1/3 h-[500px] w-[500px]"}
                    key={index}
                  >
                    <LoadingImage />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <h1 className={"text-large font-bold"}>Newly Added</h1>
      <p>Freshly arrived and ready to inspire.</p>
      <div></div>
    </div>
  );
}
