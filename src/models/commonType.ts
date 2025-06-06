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
