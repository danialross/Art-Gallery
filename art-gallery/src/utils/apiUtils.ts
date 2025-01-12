import axios from "axios";

export const getLatestArtworks = async () => {
  const url = "https://api.artic.edu/api/v1/artworks?limit=10";
  try {
    const result = await axios.get(url);
    console.log(result);
    return result.data;
  } catch (e) {
    console.error(e);
  }
};

export const getArtworksImage = async (id: number) => {
  const url = `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;
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
