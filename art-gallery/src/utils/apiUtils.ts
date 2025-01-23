import axios from "axios";
import { Artwork } from "@/types";

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
    } catch (_) {
      console.log(
        `${image_id} size ${imageSizes[currSizeIndex]} not available, trying size ${imageSizes[currSizeIndex + 1]}`,
      );
      currSizeIndex++;
    }
  }
  return null;
};

export const getArtworkIdsUsingQuery = async (
  query: string = "",
): Promise<string[]> => {
  try {
    const result = await axios.get(`${artworkInfoUrl}/search`, {
      params: {
        q: query,
        limit: 9,
      },
    });
    const ids: string[] = [];
    result.data.data.forEach((item: { id: string }) => ids.push(item.id));
    return ids || [];
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error("Error retrieving queried artworks : ", e.message);
    } else {
      console.error("Error retrieving queried artworks");
    }
    return [];
  }
};
