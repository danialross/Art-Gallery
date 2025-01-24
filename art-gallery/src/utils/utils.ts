//used by react query to convert all null values from /artwork api endpoint in artwork.data to N/A
import { Artwork } from "@/types";
import { getArtworkUsingId } from "@/utils/apiUtils";

export const processNullValues = (artworks: Artwork[]): Artwork[] => {
  const artworksCopy = [...artworks];

  for (const artwork of artworksCopy) {
    for (let key in artwork) {
      if (artwork[key as keyof Artwork] === null) {
        // @ts-ignore
        artwork[key as keyof Artwork] = "N/A";
      }
    }
  }

  return artworksCopy;
};

export const getManyArtworksUsingId = async (artworkIds: string[]) => {
  const artworks: Artwork[] = [];
  console.log(artworkIds);
  const promises = artworkIds.map(async (id: string) => {
    const artwork = await getArtworkUsingId(id);

    // console.log(!!artwork);
    if (artwork) {
      return artwork;
    } else {
      return null;
    }
  });
  const resultOfPromises = await Promise.all(promises);
  resultOfPromises.forEach((promise) => {
    if (promise != null) {
      artworks.push(promise);
    }
  });
  console.log(resultOfPromises);
  return processNullValues(artworks);

  // return processNullValues(artworks);
};
