import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPlaylistItemsRequest } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";
import { use, useEffect } from "react";
import useGetPlaylist from "./useGetPlaylist";
import { useNavigate } from "react-router";
import { getSpotifyAuthUrl } from "../utils/auth";
import LoginButton from "../common/components/LoginButton";

const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {
  // useEffect(() => {
  //   if (playlistError) {
  //     if (playlistError.message === "Unauthorized") {
  //       getSpotifyAuthUrl();
  //     } else {
  //       console.error("Failed to fetch playlist:", playlistError);
  //     }
  //   }
  // });

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
