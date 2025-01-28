"use client";
import { useEffect, useState } from "react";
import PaginationBar from "@/components/PaginationBar";
import { Artwork } from "@/types";
import Gallery from "@/components/Gallery";

type GalleryPaginationProps = {
  totalNumPages: number;
  galleryArtworks: Artwork[];
};

const GalleryWithPagination = ({
  totalNumPages,
  galleryArtworks,
}: GalleryPaginationProps) => {
  const [page, setPage] = useState(1);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <div className={`fade-in ${startAnimation ? "opacity-100" : "opacity-0"}`}>
      <div>
        <h1 className={"font-bold text-large w-full"}>Gallery</h1>
        <p>
          Step into a world of creativity and self-expression, where every piece
          has a story to tell. Our curated collection features art that sparks
          emotion, inspires conversation, and transforms spaces. Explore,
          discover, and let each work of art connect with you in a meaningful
          way.
        </p>
      </div>
      <div>
        <PaginationBar
          page={page}
          setPage={setPage}
          totalNumPages={totalNumPages}
        />
        <Gallery galleryArtworks={galleryArtworks} page={page} />
        <PaginationBar
          page={page}
          setPage={setPage}
          totalNumPages={totalNumPages}
        />
      </div>
    </div>
  );
};

export default GalleryWithPagination;
