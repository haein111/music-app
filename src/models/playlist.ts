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
