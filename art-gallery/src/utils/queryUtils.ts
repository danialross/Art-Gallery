import { useQuery } from "@tanstack/react-query";
import {
  getArtworks,
  getArtworksFromSearch,
  getArtworkUsingId,
} from "@/utils/apiUtils";
import { processNullValues } from "@/utils/utils";
import { emptyArtwork } from "@/utils/utils";

export function useSearchArtwork(search: string, searchPage: number) {
  return useQuery({
    queryKey: ["search", search, searchPage],
    queryFn: () => getArtworksFromSearch(search, searchPage),
    select: (result) => {
      if (result == null) return { totalPages: 0, artworks: [] };
      return {
        totalPages: result.totalPages,
        artworks: processNullValues(result.artworks),
      };
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 2,
  });
}

export function useGetArtwork(id: string) {
  return useQuery({
    queryKey: ["artwork", id],
    queryFn: () => getArtworkUsingId(id),
    select: (result) => {
      if (!result) {
        return emptyArtwork;
      } else {
        return emptyArtwork;
        // processNullValues([result])[0];
      }
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 2,
  });
}

export function useGetGalleryArtworks(page: number, isQueryEnabled: boolean) {
  return useQuery({
    queryKey: ["gallery", page],
    queryFn: () => getArtworks(9, page, false),
    select: (result) => processNullValues(result),
    enabled: isQueryEnabled,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 2,
  });
}
