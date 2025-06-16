import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { Image } from "./commonType";
import { SimplifiedPlaylist } from "./playlist";
import {
  Episode,
  Show,
  SimplifiedAudioBook,
  SimplifiedEpisode,
  Track,
} from "./track";

export const enum SEARCH_TYPE {
  Track = "track",
  Album = "album",
  Artist = "artist",
  Playlist = "playlist",
  Show = "show",
  Episode = "episode",
  AudioBook = "audiobook",
}

export interface SearchRequestParams {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

export interface SearchResponse {
  tracks?: ApiResponse<Track>;
  artists?: ApiResponse<Artist>;
  albums?: ApiResponse<SimplifiedAlbum>;
  playlists?: ApiResponse<SimplifiedPlaylist>;
  shows?: ApiResponse<Show>;
  episodes?: ApiResponse<SimplifiedEpisode>;
  audiobooks?: ApiResponse<SimplifiedAudioBook>;
}

export interface SearchCategoriesRequest {
  locale?: string;
  limit?: number;
  offset?: number;
}

export interface SearchCategoriesResponse {
  categories: Categories;
}

export interface Categories {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: CategoryObject[];
}

export interface CategoryObject {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}
