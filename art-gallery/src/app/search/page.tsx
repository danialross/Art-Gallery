"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { getArtworkIdsUsingQuery } from "@/utils/apiUtils";
import ArtWithDetails from "@/components/ArtWithDetails";
import { getManyArtworksUsingId } from "@/utils/utils";

const About = () => {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const { data: searchedArtworks = [] } = useQuery({
    queryKey: [search],
    queryFn: async () => {
      const artworkIds = await getArtworkIdsUsingQuery(search);
      return getManyArtworksUsingId(artworkIds);
    },
  });

  const handleEnterPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearch(inputValue);
    }
  };
  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <div className={"pb-8"}>
        <h1 className={"font-bold text-large"}>Search</h1>
        <p>
          Looking for something specific? Our gallery makes it easy to find the
          perfect piece that speaks to you. Use the search to uncover hidden
          gems, explore different styles, and bring your vision to life.
        </p>
      </div>
      <div className={"w-full flex justify-center"}>
        <div className={"w-full sm:w-[500px] flex gap-4"}>
          <Input
            placeholder={"Artist, Title, Style..."}
            value={inputValue}
            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) =>
              handleEnterPress(e)
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setInputValue(e.target.value);
            }}
          />
          <Button variant={"outline"} onClick={() => setSearch(inputValue)}>
            <FaArrowRight />
          </Button>
        </div>
      </div>
      {search && <p className={"py-4"}>{`Result for '${search}'`}</p>}
      <ArtWithDetails artworks={searchedArtworks} />
    </div>
  );
};

export default About;
