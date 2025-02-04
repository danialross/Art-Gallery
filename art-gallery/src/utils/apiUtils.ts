import axios from "axios";
import { Artwork } from "@/types";
import { processNullValues } from "@/utils/utils";

const fields =
  "id,description,date_display,image_id,place_of_origin,artist_title,title";
const artworkInfoUrl = `https://api.artic.edu/api/v1/artworks`;
const imageSizes = [843, 600, 400, 200];

const getArtworkImageUrl = (image_id: string, size: number) => {
  return `https://www.artic.edu/iiif/2/${image_id}/full/${size},/0/default.jpg`;
};

export const getTotalArtworkPages = async (): Promise<number> => {
  try {
    const result = await axios.get(artworkInfoUrl);
    return result.data.pagination.total_pages;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error(
        "Error retrieving total number of pages for artwork : ",
        e.message,
      );
    } else {
      console.error("Error retrieving total number of pages for artwork");
    }
    return -1;
  }
};

export const getArtworkUsingId = async (
  artworkId: string,
): Promise<Artwork | null> => {
  try {
    const result = await axios.get(`${artworkInfoUrl}/${artworkId}`);
    return result.data.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.error("Error retrieving artworks using ids", e.message);
    } else {
      console.error("Error retrieving artworks using ids");
    }
    return null;
  }
};

export const getArtworks = async (
  limit: number,
  page: number,
  isBoosted: boolean,
): Promise<Artwork[]> => {
  try {
    const result = await axios.get(artworkInfoUrl, {
      params: {
        page,
        is_boosted: isBoosted,
        limit,
        fields,
      },
    });
    return result.data.data.map((item: Artwork) => ({
      ...item,
      image_id: item.image_id || "",
    }));
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error("Error getting latest artwork : ", e.message);
    } else {
      console.error("Error getting latest artwork");
    }
    return [];
  }
};

export const getArtworksImage = async (
  image_id: string | null,
): Promise<Blob | null> => {
  if (image_id === null) {
    return null;
  }
  let currSizeIndex = 0;
  while (currSizeIndex < imageSizes.length - 1) {
    const url = getArtworkImageUrl(image_id, imageSizes[currSizeIndex]);
    try {
      const result = await axios.get(url, { responseType: "blob" });
      return result.data || null;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log(
          `${image_id} size ${imageSizes[currSizeIndex]} not available, trying size ${imageSizes[currSizeIndex + 1]}`,
        );
      }
      currSizeIndex++;
    }
  }
  console.error("Error getting image");
  return null;
};

export const getArtworkIdsUsingQuery = async (
  query: string = "",
  page: number,
): Promise<{ totalPages: number; artworkIds: string[] } | null> => {
  try {
    const result = await axios.get(`${artworkInfoUrl}/search`, {
      params: {
        page: page,
        q: query,
        limit: 9,
      },
    });
    const ids: string[] = [];
    const pageNum = result.data.pagination.total_pages;
    result.data.data.forEach((item: { id: string }) => ids.push(item.id));
    return { totalPages: pageNum, artworkIds: ids };
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error("Error retrieving queried artworks : ", e.message);
    } else {
      console.error("Error retrieving queried artworks");
    }
    return null;
  }
};

export const getManyArtworksUsingId = async (artworkIds: string[]) => {
  const artworks: Artwork[] = [];
  const promises = artworkIds.map(async (id: string) => {
    const artwork = await getArtworkUsingId(id);
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
  return processNullValues(artworks);
};

export const getArtworksFromSearch = async (
  search: string,
  page: number,
): Promise<{ totalPages: number; artworks: Artwork[] } | null> => {
  const searchResults = await getArtworkIdsUsingQuery(search, page);

  if (!searchResults) {
    return null;
  }

  const { totalPages, artworkIds } = searchResults;
  const artworks = await getManyArtworksUsingId(artworkIds);
  return { totalPages, artworks };
};
