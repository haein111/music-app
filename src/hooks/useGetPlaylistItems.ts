import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPlaylistItemsRequest } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
  return useInfiniteQuery({
    queryKey: ["playlist-items", params.playlist_id],
    queryFn: ({ pageParam = 0 }) => {
      console.log("Fetching page with offset:", pageParam);
      return getPlaylistItems({ offset: pageParam, ...params });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log("lastPage.next:", lastPage.next);
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        console.log("Next offset extracted:", nextOffset);
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
  });
};

export default useGetPlaylistItems;
