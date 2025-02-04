//used by react query to convert all null values from /artwork api endpoint in artwork.data to N/A
import { Artwork } from "@/types";
import { saveAs } from "file-saver";

export const processNullValues = (artworks: Artwork[]): Artwork[] => {
  const artworksCopy = [...artworks];

  for (const artwork of artworksCopy) {
    for (const key in artwork) {
      if (artwork[key as keyof Artwork] === null) {
        // @ts-expect-error key will always be a key as Artwork because it is looping an Artwork Object
        artwork[key as keyof Artwork] = "N/A";
      }
    }
  }

  return artworksCopy;
};

export const downloadImage = (url: string, name: string) => {
  try {
    saveAs(url, name);
  } catch (e) {
    console.error("Unable to download Image ", e);
  }
};

export const emptyArtwork: Artwork = {
  artist_title: "",
  date_display: "",
  description: "",
  id: -1,
  image_id: null,
  place_of_origin: "",
  title: "",
};
