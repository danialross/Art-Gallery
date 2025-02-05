"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaArrowRight } from "react-icons/fa6";
import { useSearchArtwork } from "@/utils/queryUtils";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import ArtWithDetails from "@/components/ArtWithDetails";
import { Artwork } from "@/types";
import PaginationBar from "@/components/PaginationBar";

const nullArtwork: Artwork = {
  artist_title: null,
  date_display: null,
  description: null,
  id: -1,
  image_id: null,
  place_of_origin: null,
  title: null,
};
const nullArtworks: Artwork[] = Array.from({ length: 9 }, () => nullArtwork);

const Search = () => {
  const [artworks, setArtworks] = useState<Artwork[]>(nullArtworks);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [startAnimation, setStartAnimation] = useState(false);
  const { data: searchedArtworks, isLoading: isLoadingSearchingArtworks } =
    useSearchArtwork(search, searchPage);

  const handleEnterPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearch(inputValue);
    }
  };

  useEffect(() => {
    if (isLoadingSearchingArtworks) {
      setArtworks(nullArtworks);
    }
  }, [isLoadingSearchingArtworks]);

  useEffect(() => {
    if (searchedArtworks) {
      setArtworks(searchedArtworks.artworks);
    }
  }, [searchedArtworks]);

  useEffect(() => {
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  }, [searchPage]);

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <div
      className={`minDimensions bg-background xPadding yPadding fade-in ${startAnimation ? "opacity-100" : "opacity-0"}`}
    >
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
      <PaginationBar
        totalNumPages={
          searchedArtworks?.totalPages && searchedArtworks?.totalPages < 100
            ? searchedArtworks?.totalPages
            : 100
        }
        setPage={setSearchPage}
        page={searchPage}
      />
    </div>
  );
};

export default Search;
