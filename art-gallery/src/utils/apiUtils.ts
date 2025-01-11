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
