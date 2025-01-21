import axios from "axios";
import { Artwork } from "@/types";

const fields =
  "id,description,date_display,image_id,place_of_origin,artist_title,title";
const artworkInfoUrl = `https://api.artic.edu/api/v1/artworks`;

const getArtworkImageUrl = (image_id: string) => {
  return `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;
};

export const getTotalArtworkPages = async (): Promise<number> => {
  try {
    const result = await axios.get(artworkInfoUrl);
    return result.data.pagination.total_pages;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error("Error retrieving total number of pages for artwork : ", e);
    } else {
      console.error("Error retrieving total number of pages for artwork");
    }
    return -1;
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
    return result.data.data || [];
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
  const url = getArtworkImageUrl(image_id);
  try {
    const result = await axios.get(url, { responseType: "blob" });
    return result.data || null;
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error("Error getting artwork image : ", e.message);
    } else {
      console.error("Error getting artwork image");
    }
    return null;
  }
};

export const getArtworkUsingQuery = async (
  query: string = "",
): Promise<Artwork[]> => {
  try {
    const result = await axios.get(`${artworkInfoUrl}/search`, {
      params: {
        q: query,
      },
    });
    return result.data.data || [];
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error("Error retrieving queried artworks : ", e);
    } else {
      console.error("Error retrieving queried artworks");
    }
    return [];
  }
};
