import Image from "next/image";
import { Artwork } from "@/types";

type newlyAddedArtProps = {
  src: string;
};

const NewlyAddedArt = ({
  src,
  artist_title,
  title,
  description,
  place_of_origin,
  date_display,
}: Omit<Artwork, "image_id" | "id"> & newlyAddedArtProps) => {
  return (
    <div className={""}>
      <Image
        src={src}
        alt={`${artist_title}, ${title}`}
        width={500}
        height={500}
      />
      <div className={"flex flex-col justify-center items-center"}>
        <p>{`${artist_title}, ${title}`}</p>
        <p>{description}</p>
        <p>{`${date_display}, ${place_of_origin}`}</p>
      </div>
    </div>
  );
};
export default NewlyAddedArt;
