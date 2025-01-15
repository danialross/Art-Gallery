import { getArtworksImage } from "@/utils/apiUtils";
import { Artwork } from "@/types";
import { Dispatch, SetStateAction } from "react";

export const getArtworkBlobs = async (image_ids: string[]) => {
  const artworkBlobs: (Blob | null)[] = [];
  for (let image_id of image_ids) {
    const newBlob = (await getArtworksImage(image_id)) || null;
    artworkBlobs.push(newBlob);
  }
  return artworkBlobs;
};

export const getArtworkImageIds = (artworks: Artwork[]): string[] => {
  const artworkImageIds: string[] = [];
  for (let artwork of artworks) {
    artworkImageIds.push(artwork.image_id);
  }
  return artworkImageIds;
};

export const convertBlobToUrls = (blobs: (Blob | null)[]): string[] => {
  const urls: string[] = [];
  for (let blob of blobs) {
    if (blob instanceof Blob) {
      const newUrl = URL.createObjectURL(blob);
      urls.push(newUrl);
    } else {
      urls.push("");
    }
  }
  return urls;
};

export const setUrlFromArtworks = async (
  artworks: Artwork[],
  setter: Dispatch<SetStateAction<string[]>>,
): Promise<void> => {
  const image_ids = getArtworkImageIds(artworks);
  const blobs = await getArtworkBlobs(image_ids);
  const urls = convertBlobToUrls(blobs);
  setter(urls);
};
