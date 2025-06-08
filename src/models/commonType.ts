export interface ExternalUrls {
  spotify?: string;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Restrictions {
  reason?: string;
}

export interface Followers {
  href?: string | null;
  total?: number;
}

export interface explicitContent {
  filter_enabled?: boolean;
  filter_locked?: boolean;
}

export interface Owner {
  external_url?: ExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  uri: string;
  display_name?: string | null;
}
