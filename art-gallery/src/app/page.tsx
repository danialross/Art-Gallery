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

export default function Home() {
  const { data: latestArtworks = [null, null, null, null, null] } = useQuery({
    queryKey: ["latestArtwork"],
    queryFn: getLatestArtworks,
  });

  const { data: featuredArtworks = [null, null, null, null, null, null] } =
    useQuery({
      queryKey: ["featuredArtwork"],
      queryFn: getFeaturedArtworks,
    });

  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <h1 className={"text-large font-bold"}>Featured Artwork</h1>
      <p>
        Explore our handpicked selection of the most captivating and
        talked-about pieces.
      </p>
      <div className={"flex justify-center "}>
        <Carousel className={"w-[250px] md:w-full"} opts={{ loop: true }}>
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
                  width={400}
                  height={400}
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
