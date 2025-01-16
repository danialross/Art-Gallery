import { Artwork } from "@/types";
import Art from "@/components/Art";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NewlyAddedArt = ({
  image_id,
  artist_title,
  title,
  description,
  place_of_origin,
  date_display,
}: Omit<Artwork, "id">) => {
  return (
    <div
      className={"flex flex-col lg:flex-row justify-center items-center gap-8"}
    >
      <div className={"lg:w-1/3"}>
        <Art image_id={image_id} width={500} height={500} />
      </div>
      <div
        className={"flex flex-col items-center text-center lg:w-2/3 gap-4  "}
      >
        {artist_title ? (
          <p>{artist_title}</p>
        ) : (
          <div className="w-full animate-pulse">
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5 mx-auto"></div>
          </div>
        )}

        {title && date_display && place_of_origin ? (
          <p>{` ${title}, ${date_display}, ${place_of_origin}`}</p>
        ) : (
          <div className="w-full animate-pulse">
            <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[490px] mb-2.5 mx-auto"></div>
          </div>
        )}
        {description ? (
          <>
            <div
              dangerouslySetInnerHTML={{ __html: description }}
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
                    dangerouslySetInnerHTML={{ __html: description }}
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
  );
};

export default NewlyAddedArt;
