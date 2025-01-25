"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import ArtWithDetails from "@/components/ArtWithDetails";
import { getArtworksFromSearch } from "@/utils/apiUtils";

const About = () => {
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const { data: searchedArtworks = [null, null, null, null, null, null] } =
    useQuery({
      queryKey: [search],
      queryFn: () => getArtworksFromSearch(search),
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
      <div className={"w-full flex flex-col justify-center"}>
        {search && <p className={"py-4"}>{`Result for '${search}'`}</p>}
        {searchedArtworks.length > 0 ? (
          <ArtWithDetails artworks={searchedArtworks} />
        ) : (
          <p className={"py-4 w-full text-center"}>{`No Result`}</p>
        )}
      </div>
    </div>
  );
};

export default About;
