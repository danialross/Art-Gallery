"use client";
import { useQuery } from "@tanstack/react-query";
import { getArtworkUsingQuery, getLatestArtworks } from "@/utils/apiUtils";
import Art from "@/components/Art";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { useState } from "react";

const About = () => {
  const [page, setPage] = useState(1);
  const {
    data: artworks = [null, null, null, null, null, null, null, null, null],
  } = useQuery({
    queryKey: ["gallery", page],
    queryFn: () => getArtworkUsingQuery("", page, 9),
  });

  return (
    <div className={"minDimensions bg-background xPadding yPadding"}>
      <h1 className={"text-large mb-4"}>Gallery</h1>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={"outline"}
              onClick={() => setPage((page) => page - 1)}
            >
              <ChevronLeft />
              Previous
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <Button
              variant={"outline"}
              onClick={() => setPage((page) => page + 1)}
            >
              Next <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className={"flex flex-wrap gap-4 justify-center my-4"}>
        {artworks.map((artwork, index) => (
          <Art
            key={index}
            image_id={artwork ? artwork.image_id : ""}
            height={400}
            width={400}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant={"outline"}
              onClick={() => setPage((page) => page - 1)}
            >
              <ChevronLeft /> Previous
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <Button
              variant={"outline"}
              onClick={() => setPage((page) => page + 1)}
            >
              Next <ChevronRight />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default About;
