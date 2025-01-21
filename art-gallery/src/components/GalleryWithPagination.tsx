"use client";
import { useState } from "react";
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
  return (
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
  );
};

export default GalleryWithPagination;
