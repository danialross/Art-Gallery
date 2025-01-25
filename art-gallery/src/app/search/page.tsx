"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import ArtWithDetails from "@/components/ArtWithDetails";
import { getArtworksFromSearch } from "@/utils/apiUtils";
import { Artwork } from "@/types";

const emptyArtwork: Artwork = {
  artist_title: null,
  date_display: null,
  description: null,
  id: -1,
  image_id: null,
  place_of_origin: null,
  title: null,
};
const emptyArtworks: Artwork[] = Array.from({ length: 9 }, () => emptyArtwork);

const Search = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(emptyArtworks);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const {
    // using empty artwork for loading first then if query fails it will show null
    data: searchedArtworks,
    isLoading: isLoadingSearchingArtworks,
    isSuccess: isSuccessSearchingArtworks,
  } = useQuery({
    queryKey: [search],
    queryFn: () => getArtworksFromSearch(search),
    gcTime: 1000 * 60 * 2,
    staleTime: 1000 * 60 * 1,
  });

  const handleEnterPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearch(inputValue);
    }
  };

  useEffect(() => {
    if (isLoadingSearchingArtworks) {
      setArtworks(emptyArtworks);
    }
  }, [isLoadingSearchingArtworks]);

  useEffect(() => {
    if (isSuccessSearchingArtworks) {
      setArtworks(searchedArtworks);
    }
  }, [isSuccessSearchingArtworks]);

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
      {artworks.length > 0 ? (
        <ArtWithDetails artworks={artworks} />
      ) : (
        <p className={"py-4 w-full text-center"}>{`No Result`}</p>
      )}
    </div>
  );
};

export default Search;
