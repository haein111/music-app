export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export interface PlaylistArray {
  id?: string;
  name?: string;
  images?: { url: string }[];
  owner?: { display_name?: string | null };
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}
