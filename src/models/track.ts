import { SimplifiedAlbum } from "./album";
import { Artist } from "./artist";
import { ExternalUrls, Image, Restrictions } from "./commonType";

export interface Track {
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: Track;
  restrictions?: Restrictions;

  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}

export interface Episode {
  description: string;
  html_description: string;

  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: string;
  uri: string;
  restrictions?: Restrictions;
  show: Show;
}

export type SimplifiedEpisode = Omit<Episode, "show">;

export interface Show {
  available_markets: string[];
  copyrights: Copyrights;
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean | null;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show";
  uri: string;
  total_episodes: number;
}

export interface Copyrights {
  text?: string;
  type?: string;
}

// export interface TrackLink {
//   external_urls: {
//     spotify: string;
//   };
//   href: string;
//   id: string;
//   type: "track";
//   uri: string;
// }

export interface SimplifiedAudioBook {
  author: { name: string }[];
  available_markets: string[];
  copyrights: Copyrights;
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: { name: string }[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
}
