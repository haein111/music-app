import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, Image, Owner } from "./commonType";
import { Episode, Track } from "./track";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_url?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner: Owner;
  public?: boolean;
  snapshot_id?: string;
  type: "playlist";
  uri: string;
}

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface PlaylistArray {
  id?: string;
  name?: string;
  images?: { url: string }[];
  owner?: { display_name?: string | null };
}

export interface Playlist extends BasePlaylist {
  tracks?: ApiResponse<PlaylistTrack>;
  // followers: Followers;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  offset?: number;
  limit?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  } | null;
  is_local?: boolean;
  track: Track | Episode;
}

export interface createPlaylistRequest {
  name: string;
  palylistPublic?: boolean;
  collaborative?: boolean;
  description?: string;
}

export interface AddItemsToPlaylistRequest {
  uris?: string[];
  position?: number;
}

export interface AddItemsToPlaylistResponse {
  snapshot_id?: string;
}
