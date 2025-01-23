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

export const getManyArtworksUsingId = (artworkIds: string[]) => {
  const artworks: Artwork[] = [];
  artworkIds.forEach(async (id: string) => {
    const artwork = await getArtworkUsingId(id);
    if (artwork) {
      artworks.push(artwork);
    }
  });

  return processNullValues(artworks);
};
