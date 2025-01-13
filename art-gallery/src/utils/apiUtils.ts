import axios from "axios";
import { getRandomNumber } from "@/utils/utils";
import { Artwork } from "@/types";

const fields =
  "fields=description,date_display,image_id,place_of_origin,artist_title";

const infoUrl = "https://api.artic.edu/api/v1/artworks";
const getImageUrl = (id: string) => {
  return `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
};

export const getArtwork = async (ids: [string]) => {
  const url = `${infoUrl}?ids=${ids.toString()}&${fields}`;
  try {
    const result = await axios.get(url);
    return result.data;
  } catch (e) {
    console.error(`Error retrieving ${ids.toString()}`, e);
  }
};

export const getLatestArtworks = async () => {
  const url = `${infoUrl}?${fields}&limit=5`;
  try {
    const result = await axios.get(url);
    console.log(result);
    return result.data;
  } catch (e) {
    console.error(e);
  }
};

export const getArtworksImage = async (id: string) => {
  const url = getImageUrl(id);
  try {
    const result = await axios.get(url);
    console.log(result);
    return result.data;
  } catch (e) {
    console.error(e);
  }
};

export const getTotalArtworks = async () => {
  const url = "https://api.artic.edu/api/v1/artworks";
  try {
    const result = await axios.get(url);
    console.log(result);
    return result.data.pagination.total;
  } catch (e) {
    console.error(e);
  }
};

export const getFeaturedArtworks = async () => {
  const totalArtworkNum = await getTotalArtworks();
  const ids = [];
  const isArtworkValid = false;

  while (!isArtworkValid) {
    let lastRandomNumber = 0;
    let randomNumber = getRandomNumber(totalArtworkNum);
    //make sure artwork is not the same
    while (randomNumber === lastRandomNumber) {
      randomNumber = getRandomNumber(lastRandomNumber);
    }

    ids.push(getRandomNumber(totalArtworkNum));

    const result = await axios.get(url);
  }

  const artworks: Artwork[] = [];
  const url = `https://api.artic.edu/api/v1/artworks`;
  try {
    for (let id of ids) {
      const imageId = (await axios.get(`url/${id}`)).data.image_id;
      artworks.push(imageId);
    }
  } catch (e) {
    console.error("Unable to get featured artwork ", e);
  }

  return artworks;
};
