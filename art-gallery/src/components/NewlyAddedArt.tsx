"use client";
import { Artwork } from "@/types";
import Art from "@/components/Art";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useRef, useState } from "react";

type newlyAddedArtworkProps = {
  artworks: Artwork[];
};

const NewlyAddedArt = ({
  // image_id,
  // artist_title,
  // title,
  // description,
  // place_of_origin,
  // date_display,
  artworks,
}: newlyAddedArtworkProps) => {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    // Add an event listener for window resize
    const setGalleryWidth = () => {
      if (imageRef.current) {
        const newWidth = imageRef.current.offsetWidth;
        setImageWidth(newWidth);
      }
    };
    setGalleryWidth();
    window.addEventListener("resize", setGalleryWidth);
    return () => window.removeEventListener("resize", setGalleryWidth);
  }, []);

  return (
    <>
      <h1 className={"text-large font-bold"}>Newly Added</h1>
      <p>Freshly arrived and ready to inspire.</p>
      <div className={"py-8 space-y-16"}>
        {artworks.map((artwork: Artwork) => (
          <div
            className={
              "flex flex-col lg:flex-row justify-center items-center gap-8"
            }
            key={`NewlyAddedArt-${artwork.image_id}`}
          >
            <div className={"lg:w-1/3"} ref={imageRef}>
              <Art
                image_id={artwork.image_id}
                width={imageWidth}
                height={imageWidth}
              />
            </div>
            <div
              className={
                "flex flex-col items-center text-center lg:w-2/3 gap-4  "
              }
            >
              {artwork.artist_title ? (
                <p>{artwork.artist_title}</p>
              ) : (
                <div className="w-full animate-pulse">
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5 mx-auto"></div>
                </div>
              )}

              {artwork.title &&
              artwork.date_display &&
              artwork.place_of_origin ? (
                <p>{` ${artwork.title}, ${artwork.date_display}, ${artwork.place_of_origin}`}</p>
              ) : (
                <div className="w-full animate-pulse">
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[490px] mb-2.5 mx-auto"></div>
                </div>
              )}
              {artwork.description ? (
                <>
                  <div
                    dangerouslySetInnerHTML={{ __html: artwork.description }}
                    className={"w-full text-center hidden lg:block "}
                  />
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full lg:hidden -mt-4"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className={"text-medium"}>
                        Description
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: artwork.description,
                          }}
                          className={"text-medium text-center"}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>
              ) : (
                <div className="w-full animate-pulse">
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[450px] mb-2.5 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[520px] mb-2.5 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[470px] mb-2.5 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5 mx-auto"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NewlyAddedArt;
