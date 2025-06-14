import { useInfiniteQuery } from "@tanstack/react-query";
import { searchItemsByKeyword } from "../apis/searchApi";
import { SearchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";

const useSearchItemsByKeyword = (params: SearchRequestParams) => {
  const clientCedentialToken = useClientCredentialToken();
  return useInfiniteQuery({
    queryKey: ["search", params],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCedentialToken) {
        throw new Error("No token available");
      }
      return searchItemsByKeyword(clientCedentialToken, {
        ...params,
        offset: pageParam,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPageUrl =
        lastPage.tracks?.next ||
        lastPage.albums?.next ||
        lastPage.artists?.next ||
        lastPage.playlists?.next ||
        lastPage.shows?.next ||
        lastPage.episodes?.next ||
        lastPage.audiobooks?.next;

      if (nextPageUrl) {
        const nextOffset = new URL(nextPageUrl).searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
    enabled: !!params.q, // 키워드 있을 때만 쿼리 실행
  });
};

export default useSearchItemsByKeyword;
