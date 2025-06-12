import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import { createPlaylistRequest } from "../models/playlist";

const useCreatePlaylist = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  return useMutation({
    mutationFn: (params: createPlaylistRequest) => {
      if (user && typeof user.id === "string") {
        // if (user) {
        return createPlaylist(user.id, params);
      }
      return Promise.reject(new Error("User not found"));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      console.log("Playlist created successfully");
    },
  });
};

export default useCreatePlaylist;
