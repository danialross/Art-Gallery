import axios from "axios";
import { Artwork } from "@/types";

const fields =
  "id,description,date_display,image_id,place_of_origin,artist_title";
const artworkInfoUrl = `https://api.artic.edu/api/v1/artworks`;

const getArtworkImageUrl = (image_id: string) => {
  return `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`;
};

export const getLatestArtworks = async (): Promise<Artwork[]> => {
  try {
    const result = await axios.get(artworkInfoUrl, {
      params: {
        limit: 5,
        fields: fields,
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
  image_id: string,
): Promise<Blob | null> => {
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

export const getFeaturedArtworks = async (): Promise<Artwork[]> => {
  try {
    const result = await axios.get(`${artworkInfoUrl}`, {
      params: {
        limit: 6,
        fields: fields,
        is_boosted: true,
      },
    });
    return result.data.data || [];
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      console.error("Error retrieving featured artworks : ", e);
    } else {
      console.error("Error retrieving featured artworks");
    }
    return [];
  }
};

export const getArtworkUsingQuery = async (
  query: string,
  page = 1,
): Promise<Artwork[]> => {
  try {
    const result = await axios.get(`${artworkInfoUrl}/search`, {
      params: {
        limit: 12,
        fields: fields,
        q: query,
        page: page,
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
