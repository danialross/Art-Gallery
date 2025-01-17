"use client";
import { useQuery } from "@tanstack/react-query";
import { getArtworkUsingQuery, getTotalArtworkPages } from "@/utils/apiUtils";
import Art from "@/components/Art";
import PaginationBar from "@/components/PaginationBar";
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
      <PaginationBar page={page} setPage={setPage} />
      <div className={"flex flex-wrap gap-4 justify-center my-4 "}>
        {artworks.map((artwork, index) => (
          <Art
            key={index}
            image_id={artwork ? artwork.image_id : ""}
            height={350}
            width={350}
          />
        ))}
      </div>
      <PaginationBar page={page} setPage={setPage} />
    </div>
  );
};

export default About;
