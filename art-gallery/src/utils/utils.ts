import { getArtworksImage } from "@/utils/apiUtils";

export const getArtworkBlobs = (image_ids:string[]) => {
  const artworkBlobs = [];
  for(let id of image_ids){
    artworkBlobs.push(getArtworksImage(id))
  }
  return artworkBlobs;
}