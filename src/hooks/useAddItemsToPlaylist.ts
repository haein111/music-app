import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemsToPlaylist } from "../apis/playlistApi";
import { AddItemsToPlaylistRequest } from "../models/playlist";

const useAddItemsToPlaylist = (playlist_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddItemsToPlaylistRequest) => {
      if (playlist_id) {
        return addItemsToPlaylist(playlist_id, params);
      }
      return Promise.reject(new Error("Playlist ID is required"));
    },

    // Invalidate the playlist items cache
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", playlist_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist-items"],
      });
      queryClient.invalidateQueries({
        queryKey: ["current-user-playlists"],
      });
    },
  });
};

export default useAddItemsToPlaylist;
