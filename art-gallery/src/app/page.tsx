"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedArtworks, getLatestArtworks } from "@/utils/apiUtils";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Artwork } from "@/types";
import { useEffect, useState } from "react";
import { getArtworkBlobs } from "@/utils/utils";

export default function Home() {
  const [featuredArtworksImages,setFeaturedArtworksImages] = useState<Blob[]>([]);
  const [latestArtworksImages,setLatestArtworksImages] = useState<Blob[]>([]);


  const {
    isError: isErrorLatestArtworks,
    isLoading: isLoadingLatestArtworks,
    data: latestArtworks = [],
    isSuccess: isSuccessLatestArtworks
  } = useQuery({
    queryKey: ["latestArtwork"],
    queryFn: getLatestArtworks,
  });

  const {
    isError: isErrorFeaturedArtworks,
    isLoading: isLoadingFeaturedArtworks,
    data: featuredArtworks = [],
    isSuccess: isSuccessFeaturedArtworks
  } = useQuery({
    queryKey: ["featuredArtwork"],
    queryFn: getFeaturedArtworks,
  });

//   useEffect(() => {
// if(isSuccessFeaturedArtworks && featuredArtworks){
//   getArtworkBlobs(featuredArtworks)
// }
//   },[isSuccessFeaturedArtworks,featuredArtworks])
//   useEffect(() => {},[isSuccessLatestArtwork])


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
            {/*{featuredArtworks.map((blob: Blob) => (*/}
            {/*  <CarouselItem className={"basis-1/3"}>*/}
            {/*    <Image*/}
            {/*      src={"/Art_Institute_of_Chicago_logo.png"}*/}
            {/*      alt={"first"}*/}
            {/*      width={300}*/}
            {/*      height={300}*/}
            {/*    />*/}
            {/*  </CarouselItem>*/}
            {/*))}*/}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
