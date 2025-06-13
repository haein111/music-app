import {
  createPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
} from "../models/playlist";
import {
  GetCurrentUserPlaylistRequest,
  GetPlaylistRequest,
  Playlist,
} from "../models/playlist";
import api from "./api";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist items");
  }
};

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPlaylist = async (
  user_id: string,
  params: createPlaylistRequest
): Promise<Playlist> => {
  try {
    const { name, description, palylistPublic, collaborative } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      description,
      public: palylistPublic,
      collaborative,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to create playlist");
  }
};
